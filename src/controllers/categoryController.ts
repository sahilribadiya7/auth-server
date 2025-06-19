import { Request, Response } from "express";
import { Category } from "../models/categoryModel";

// ✅ Create a new category
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            res.status(400).json({ message: "Category name is required" });
            return;
        }

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            res.status(400).json({ message: "Category already exists" });
            return;
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error });
    }
};

// ✅ Get all categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const { search, page = "1", limit = "10" } = req.query;

        const query: Record<string, any> = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10;
        const skip = (pageNum - 1) * limitNum;

        const categories = await Category.find(query)
            .skip(skip)
            .limit(limitNum);

        const totalCategories = await Category.countDocuments(query);

        res.status(200).json({
            categories,
            totalCategories,
            totalPages: Math.ceil(totalCategories / limitNum),
            currentPage: pageNum,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch categories", error });
    }
};

// ✅ Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving category", error });
    }
};

// ✅ Update a category
export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error });
    }
};

// ✅ Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error });
    }
};
