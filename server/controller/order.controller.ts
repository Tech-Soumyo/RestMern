import { Request, Response } from "express";
import Stripe from "stripe";
import { Order } from "../models/order.model";
import { Restaurant } from "../models/resturent.model";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY!);
// const ObjectId = mongoose.Types.ObjectId;
if (!process.env.STRIPE_SECRETE_KEY) {
  throw new Error("Stripe secret key is not defined in environment variables");
}

type CheckOutSessionRequestType = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  delivaryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  restaurantId: string;
};

export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.id })
      .populate("user")
      // typo Restaurant
      .populate("restaurant");
    res.status(200).json({
      success: true,
      orders,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
    return;
  }
};
export const createLineItems = (
  checkOutSessionResquest: CheckOutSessionRequestType,
  // menuItems: MenuItemType[]
  menuItems: any
) => {
  const lineItems = checkOutSessionResquest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item: any) => item._id.toString() === cartItem.menuId
    );
    if (!menuItem) throw new Error(`Menu item id not found`);

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.image],
        },
        unit_amount: menuItem.price * 100,
      },
      quantity: cartItem.quantity,
    };
  });
  return lineItems;
};

export const createCheckOutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const checkOutSessionResquest: CheckOutSessionRequestType = req.body;
    // console.log("HIi 0 ", checkOutSessionResquest);
    // console.log("Received delivaryDetails: ", req.body.delivaryDetails);
    // console.log("Request body:", req.body); // Debugging request body
    // console.log("Authenticated user ID:", req.id);
    // const restaurant = await Restaurant.findById(
    //   new ObjectId(checkOutSessionResquest.restaurantId)
    // ).populate("menus");
    // console.log("HIi 1 ");
    const restaurant = await Restaurant.findById(
      checkOutSessionResquest.restaurantId
    ).populate("menus");
    // console.log("Hii 2", restaurant);
    if (!restaurant) {
      res.status(404).json({
        success: false,
        message: "Restaurnt not found",
      });
      return;
    }
    // console.log("Recieved Restaurent", restaurant);
    const order: any = new Order({
      restaurant: restaurant._id,
      user: req.id,
      delivaryDetails: checkOutSessionResquest.delivaryDetails,
      cartItems: checkOutSessionResquest.cartItems,
      status: "pending",
    });

    // console.log("Recieved Orders", order);

    const menuItems = restaurant.menus;
    // console.log("Recieved menuItems", menuItems);
    const lineItems = createLineItems(checkOutSessionResquest, menuItems);

    // console.log("Recieved lineItems", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "CA", "US"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(menuItems.map((items: any) => items.image)),
      },
    });
    // console.log("Recieved session", session.line_items);

    if (!session.url) {
      throw new Error("Session URL is not created properly");
    }
    await order.save();
    res.status(200).json({
      session,
    });
    // console.log("after saved order", order);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const stripeWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];

    // Construct the payload string for verification
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;

    // Generate test header string for event construction
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    // Construct the event using the payload string and header
    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error: any) {
    console.error("Webhook error:", error.message);
    res.status(400).send(`Webhook error: ${error.message}`);
    return;
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const order = await Order.findById(session.metadata?.orderId);

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      // Update the order with the amount and status
      if (session.amount_total) {
        order.totalAmount = session.amount_total;
      }
      order.status = "confirmed";

      await order.save();
    } catch (error) {
      console.error("Error handling event:", error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  }
  // Send a 200 response to acknowledge receipt of the event
  res.status(200).send();
};
