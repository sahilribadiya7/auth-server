import { Request, Response } from "express";
import User from "../../models/userModel";

// **Update User**
export const updateUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = (req as any).user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { firstName, lastName, email } = req.body;

        const updatedData: any = {};
        if (firstName) updatedData.firstName = firstName;
        if (lastName) updatedData.lastName = lastName;
        if (email) updatedData.email = email;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            updatedData,
            {
                new: true,
            }
        ).select("-password"); // Exclude password from response

        res.json({
            _id: updatedUser?._id,
            firstName: updatedUser?.firstName,
            lastName: updatedUser?.lastName,
            email: updatedUser?.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
