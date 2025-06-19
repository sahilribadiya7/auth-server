import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Token
  // console.log("Token received:", token); // Debugging log

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    // console.log("Decoded token:", decoded);

    if (!decoded || !decoded.userId) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
