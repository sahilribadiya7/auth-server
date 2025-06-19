import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/userModel";

// **Register User**
export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({
                status: "error",
                message: "Email already exists",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ status: "success", user: newUser });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: (error as Error).message,
        });
    }
};
