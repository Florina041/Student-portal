import { Budget }from "../models/Budget.js";
import { Society } from "../models/Society.js";

export const getBudgets = async (req, res) => {
  try {

    if (!["Admin", "SuperAdmin"].includes(req.user?.member?.role)) {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const budgets = await Budget.find().populate("society", "name");
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const  createBudget = async (req, res) => {
  try {
    const { amount, description, society } = req.body;

    // Find target society
    const targetSociety = await Society.findById(society);
    if (!targetSociety) {
      return res.status(404).json({ message: "Society not found" });
    }

    // Restriction: Coordinators can only create for their own society
    if (req.user.member.role === "Coordinator") {
      if (req.user.member.society.toString() !== society.toString()) {
        return res.status(403).json({ message: "Coordinators can only create budgets for their own society" });
      }
    }
    
    const budget = await Budget.create({
      amount,
      description,
      society,
      createdBy: req.user._id, 
    });

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

