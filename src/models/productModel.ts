import mongoose, { Schema, Document } from "mongoose";
import { ICategory } from "./categoryModel"; // Ensure correct import

export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    category: ICategory["_id"]; // Ensure it's an ObjectId
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }, // Ensure correct reference
        stock: { type: Number, required: true, default: 0 },
        images: { type: [String], default: [] },
    },
    { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
