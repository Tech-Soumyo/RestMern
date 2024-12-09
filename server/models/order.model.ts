import mongoose, { Document } from "mongoose";

type DelivaryDetails = {
  email: String;
  name: String;
  address: String;
  city: String;
};

type CartItems = {
  menuId: String;
  name: String;
  image: String;
  price: Number;
  quantity: Number;
};

export interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  delivaryDetails: DelivaryDetails;
  cartItems: CartItems;
  totalAmount: Number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "outfordelivery"
    | "delivered";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    delivaryDetails: {
      email: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
    cartItems: [
      {
        menuId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outfordelivery",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
