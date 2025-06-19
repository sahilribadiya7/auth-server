import { Request, Response } from "express";
import User from "../../models/userModel";

export const edituser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;

        const updatedData: any = {};
        if (firstName) updatedData.firstName = firstName;
        if (lastName) updatedData.lastName = lastName;
        if (email) updatedData.email = email;

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true,
        }).select("-password");

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
