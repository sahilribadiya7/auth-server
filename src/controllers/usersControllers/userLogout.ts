import { Request, Response } from "express";

// **Logout User**
export const logout = (req: Request, res: Response) => {
  res.clearCookie("authToken");
  res.json({ message: "Logged out successfully" });
};
