import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateVerifiactionCode } from "../utils/generateVerificationCode.utils";
import { generateToken } from "../utils/generateToken.utils";
import cloudinary from "../utils/cloudinary.utils";
import {
  senderVarificationEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
} from "../mailtrap/email";

export const signup = async (req: Request, res: Response): Promise<void> => {
  /*
  Algorithm

  1. Extract Request Data
  2. Check for Existing User
  3. Hash the Password
  4. Generate Verification Token
  5. Create New User
  6. Generate Authentication Token
  7. Send Verification Email
  8. Retrieve User Without Password
  9. Send Success Response
  10. Handle Errors
  */
  try {
    const { fullName, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerifiactionCode().toLowerCase();

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiryAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours expiry
    });

    //  6. Generate Authentication Token
    generateToken(res, user);
    await senderVarificationEmail(email, verificationToken);
    // console.log(verificationToken);

    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  /**
   * Algorithm

   * Extract Request Data
   * Find User by Email
   * Verify Password
   * Generate Authentication Token
   * Update Last Login Timestamp
   * Send User Data Without Password
   * Return Success Response
   * Handle Errors
   */
  try {
    const { email, password } = req.body;

    // Find User by Email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Incorrect email",
      });
      return;
    }

    // Verify Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
      return;
    }

    // Generate Authentication Token
    generateToken(res, user);

    // Update Last Login Timestamp
    user.lastLogin = new Date();
    await user.save();

    // Send User Data Without Password
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    // Return Success Response
    res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);

    // Handle Errors
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { verificationCode } = req.body;

    // Find User by Verification Token and Expiry Date
    const user = await User.findOne({
      verificationToken: verificationCode, // Ensure this matches how it's stored in the database
      verificationTokenExpiryAt: { $gt: Date.now() }, // Corrected field name
    }).select("-password");

    if (!user) {
      console.log("User not found or token expired");
      res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
      return;
    }

    // console.log("Provided code:", verificationCode);
    // console.log("Stored token:", user.verificationToken);

    // Proceed if user is found
    user.isVarified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiryAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_: Request, res: Response): Promise<void> => {
  try {
    // Clear the cookie and send success response
    res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
    return;
  } catch (error) {
    console.error(error);

    // Handle errors
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
      return;
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenexpireAt = new Date(Date.now() + 1 * 60 * 60 * 1000);

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpairyAt = resetTokenexpireAt;

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetpassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpairyAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpairyAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.id;
    const { fullName, email, address, city, country, profilePicture } =
      req.body;

    let cloudResponse = await cloudinary.uploader.upload(profilePicture);

    const updatedData = {
      fullName,
      email,
      country,
      city,
      address,
      profilePicture: cloudResponse.secure_url, // Ensure you use the correct URL from the upload response
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
