import mongoose, { Document, model, Schema } from "mongoose";

export interface RestaurantType {
  user: mongoose.Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  delivaryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: mongoose.Schema.Types.ObjectId[];
}

export interface RestaurantData extends RestaurantType, Document {
  createdAt: Date;
  UpdatedAt: Date;
}

const restaurantSchema = new Schema<RestaurantData>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    delivaryTime: {
      type: Number,
      required: true,
    },
    cuisines: [{ type: String, required: true }],
    menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Restaurant = model("Restaurant", restaurantSchema);
