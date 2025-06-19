import { Request, Response } from "express";
import { Product } from "../models/productModel";

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error });
    }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        console.error("Error retrieving products:", error); // Log full error
        res.status(500).json({
            message: "Error retrieving products",
            error: error,
        });
    }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "category"
        );
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving product", error });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("category");
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
