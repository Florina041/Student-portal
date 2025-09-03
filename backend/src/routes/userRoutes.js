import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/adminUserController.js";
import { protect, isAdmin, isSuperAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected (any logged-in user can view their own profile)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// Admin-only routes
router.get("/", protect, isAdmin, getAllUsers);        // Admin + SuperAdmin
router.get("/:id", protect, isAdmin, getUserById);     // Admin + SuperAdmin
router.put("/:id", protect, isAdmin, updateUser);      // Admin + SuperAdmin
router.delete("/:id", protect, isSuperAdmin, deleteUser); // Only SuperAdmin can delete

export default router;
