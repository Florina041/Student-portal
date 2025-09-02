import Budget from "../models/budgetModel.js";

let getBudgets = async (req, res) => {
  try {
    
    let budgets = await Budget.find().populate("society", "name");
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let createBudget = async (req, res) => {
  try {
    let { amount, description, society } = req.body;

    let budget = await Budget.create({
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

export { getBudgets, createBudget };
