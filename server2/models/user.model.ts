import mongoose, { Document, Model, Schema } from "mongoose";
export interface UserType {
  fullName: string;
  email: string;
  password: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  lastLogin?: Date;
  isVarified?: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpairyAt?: Date;
  verificationToken?: string;
  verificationTokenExpiryAt: Date | undefined;
}

export interface UserData extends UserType, Document {
  createdAt: Date;
  UpdatedAt: Date;
}

const userSchema = new Schema<UserData>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      default: "Update your address",
    },
    city: {
      type: String,
      default: "Update your city",
    },
    country: {
      type: String,
      default: "Update your country",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    admin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpairyAt: Date,
    verificationToken: String,
    verificationTokenExpiryAt: Date,
  },
  {
    timestamps: true,
  }
);

export const User: Model<UserData> = mongoose.model<UserData>(
  "User",
  userSchema
);
