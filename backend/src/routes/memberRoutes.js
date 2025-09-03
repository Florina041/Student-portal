import express from "express";
import { getMembers,addMember } from "../controllers/memberController";
import { protect,isCoordinatorOrAbove } from "../middleware/authMiddleware.js"

const router = express.Router();

//public
router.get("/", getMembers);

//restricted to coordinators + admin + superadmin
router.post("/", protect,isCoordinatorOrAbove,addMember);

export default router;
