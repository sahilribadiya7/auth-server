import { Request, Response } from "express";
import User from "../../models/userModel";

// **Delete User (Protected Route)**
interface AuthRequest extends Request {
    user?: { userId: string }; // Extend Request type to include user
}

export const deleteUser = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const userIdFromToken = req.user?.userId; // Get user ID from token (set by authMiddleware)
        const userIdFromParams = req.params.id; // Get user ID from URL params

        if (!userIdFromToken) {
            res.status(401).json({
                message: "Unauthorized: No user ID found in token.",
            });
            return;
        }

        if (userIdFromToken !== userIdFromParams) {
            res.status(403).json({
                message: "Forbidden: You can only delete your own account.",
            });
            return;
        }

        // Delete user from the database
        await User.findByIdAndDelete(userIdFromToken);

        // Clear authentication cookie
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });

        res.json({ message: "User deleted successfully" });
        return;
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
