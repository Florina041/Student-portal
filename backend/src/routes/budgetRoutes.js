import express from "express";
import { getBudgets,createBudget } from "../controllers/budgetContoller.js";
import { protect,isAdmin,isCoordinatorOrAbove } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect,isAdmin,getBudgets);
router.post("/", protect,isCoordinatorOrAbove,createBudget);

export default router;
