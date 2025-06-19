import express from "express";
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "../controllers/productController";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/edit/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
