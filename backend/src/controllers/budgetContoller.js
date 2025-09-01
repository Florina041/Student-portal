const Budget = require("../models/budgetModel");

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find().populate("society", "name");
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBudget = async (req, res) => {
  try {
    const { amount, description, society } = req.body;

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

module.exports = { getBudgets, createBudget };
