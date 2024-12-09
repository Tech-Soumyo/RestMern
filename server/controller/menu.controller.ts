import { Request, Response } from "express";
import uploadImage from "../utils/imageUploader.utls";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/resturent.model";
import mongoose from "mongoose";

// export const addMenu = async (res: Response, req: Request): Promise<void> => {
//   try {
//     const { name, description, price } = req.body;
//     const file = req.file;
//     if (!file) {
//       res.status(400).json({
//         success: false,
//         message: "Image is required",
//       });
//       return;
//     }
//     const imageUrl = await uploadImage(file as Express.Multer.File);
//     const menu: any = await Menu.create({
//       name,
//       description,
//       price,
//       image: imageUrl,
//     });
//     const resturent = await Restaurant.findOne({ user: req.id });
//     if (resturent) {
//       (resturent.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
//       await resturent.save();
//     }

//     res.status(201).json({
//       success: true,
//       message: "Menu added successfully",
//       menu,
//     });
//     return;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//     return;
//   }
// };
export const addMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name = "", description = "", price = 0 } = req.body; // Provide default values
    const file = req.file;

    if (!name || !description || !price) {
      res.status(400).json({
        success: false,
        message: "Name, description, and price are required!",
      });
      return;
    }

    if (!file) {
      res.status(400).json({
        success: false,
        message: "Image is required",
      });
      return;
    }

    const imageUrl = await uploadImage(file);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      restaurant.menus.push(menu.id);
      await restaurant.save();
    }

    res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
    // console.log(Menu.find());
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editMenu = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
      res.status(404).json({
        success: false,
        message: "Menu not found!",
      });
      return;
    }
    if (name) {
      menu.name = name;
    }
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImage(file as Express.Multer.File);
      menu.image = imageUrl;
    }
    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
