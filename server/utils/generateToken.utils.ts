import { UserData } from "../models/user.model";
import jwt from "jsonwebtoken";
import { Response } from "express";
export const generateToken = (res: Response, user: UserData) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
