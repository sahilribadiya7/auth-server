import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";

// **Update Password**
export const updatePassword = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = (req as any).user; // Ensure user is authenticated via middleware
        if (!user) {
            res.status(400).json({ success: false, message: "Unauthorized" });
            return;
        }

        const { oldPassword, newPassword } = req.body;

        // Validate request body
        if (!oldPassword || !newPassword) {
            res.status(401).json({
                success: false,
                message: "Both old and new passwords are required",
            });
            return;
        }

        // Find user in database
        const existingUser = await User.findById(user._id);
        if (!existingUser) {
            res.status(402).json({ success: false, message: "User not found" });
            return;
        }

        // Check if old password is correct
        const isMatch = await bcrypt.compare(
            oldPassword,
            existingUser.password
        );
        if (!isMatch) {
            res.status(403).json({
                success: false,
                message: "Old password is incorrect",
            });
            return;
        }

        // Prevent using the same old password
        const isSamePassword = await bcrypt.compare(
            newPassword,
            existingUser.password
        );
        if (isSamePassword) {
            res.status(404).json({
                success: false,
                message: "New password cannot be the same as old password",
            });
            return;
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in the database
        existingUser.password = hashedPassword;
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
