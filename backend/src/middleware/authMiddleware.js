import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Get user from token (without password)
      req.user = await User.findById(decoded.sub).select("-password -refreshToken").populate("member","role");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next(); // move to next middleware/controller
    } catch (error) {
      console.error("JWT Error:",error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Allow only SuperAdmins
export const isSuperAdmin = (req, res, next) => {
  if (req.user?.member?.role !== "SuperAdmin") {
    return res.status(403).json({ message: "Access denied. SuperAdmin only." });
  }
  next();
};

// Allow Admins + SuperAdmins
export const isAdmin = (req, res, next) => {
  if (!["Admin", "SuperAdmin"].includes(req.user?.member?.role)) {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

// Allow Coordinators + Admins + SuperAdmins
export const isCoordinatorOrAbove = (req, res, next) => {
  if (!["Coordinator", "Admin", "SuperAdmin"].includes(req.user?.member?.role)) {
    return res.status(403).json({ message: "Access denied. Coordinator or higher required." });
  }
  next();
};


