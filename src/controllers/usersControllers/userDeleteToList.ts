import { Request, Response } from "express";
import User from "../../models/userModel";

// **Delete User**
export const userDeleteToList = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userIdFromParams = req.params.id; // Get user ID from URL params

        if (!userIdFromParams) {
            res.status(400).json({
                message: "Bad Request: No user ID provided.",
            });
            return;
        }

        // Delete user from the database
        await User.findByIdAndDelete(userIdFromParams);

        res.json({ message: "User deleted successfully" });
        return;
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
