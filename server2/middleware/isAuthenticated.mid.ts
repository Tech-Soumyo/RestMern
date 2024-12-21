import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; // Removed unused imports

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // 1. Retrieve token from cookies
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "User is not Authenticated",
      });
      return;
    }

    // 2. Verify the token
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as jwt.JwtPayload;
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
      return;
    }

    /*  3. Attach user ID to request object
          If the token verification succeeds:
            Assign the userId from decoded to req.id to make it accessible for subsequent middleware or route handlers
    */
    req.id = decoded.userId;

    // 4. Pass control to next middleware
    next();
  } catch (error) {
    // 5. Handle internal errors
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
