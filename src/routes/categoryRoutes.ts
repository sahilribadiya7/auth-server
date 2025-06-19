import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddlewareToken";

const router = express.Router();

router.post("/create", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/edit/:id", authMiddleware, updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
