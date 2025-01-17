import express from "express";
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, userController.getUser);
router.patch("/:id", authMiddleware, userController.updateUser);

export default router;
