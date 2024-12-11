import express from "express";
import productController from "../controller/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, productController.getProduct);
router.post("/", authMiddleware, productController.addProduct);
router.patch("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

export default router;
