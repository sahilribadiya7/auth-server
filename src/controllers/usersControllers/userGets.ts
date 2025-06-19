import { Request, Response } from "express";
import User from "../../models/userModel";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const { search, role, page = "1", limit = "10" } = req.query;

        const query: Record<string, any> = {};

        // Filter by role (if not "All")
        if (role && role !== "All") {
            query.role = role;
        }

        // Search by name or email (case-insensitive)
        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        // Pagination
        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Fetch users with filtering, pagination, and excluding password
        const users = await User.find(query)
            .skip(skip)
            .limit(limitNum)
            .select("-password");

        // Get total users count (for pagination)
        const totalUsers = await User.countDocuments(query);

        res.status(200).json({
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limitNum),
            currentPage: pageNum,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

// **Get User Data**
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = (req as any).user;
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" });
    }
};
