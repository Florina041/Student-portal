import express from "express";
import {
  getSocieties,
  createSociety,
  getSocietyById,
  updateSociety,
  deleteSociety,
  addMember,
  removeMember,
} from "../controllers/societyController.js";
import { protect, isAdmin, isSuperAdmin, isCoordinatorOrAbove } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getSocieties);
router.get("/:id", getSocietyById);

// Restricted routes
router.post("/", protect, isAdmin, createSociety);             // Admin + SuperAdmin
router.put("/:id", protect, isAdmin, updateSociety);           // Admin + SuperAdmin
router.delete("/:id", protect, isSuperAdmin, deleteSociety);   // SuperAdmin only
router.post("/:id/members", protect, isCoordinatorOrAbove, addMember);   // Coordinator +
router.delete("/:id/members/:memberId", protect, isCoordinatorOrAbove, removeMember); // Coordinator +


export default router;
