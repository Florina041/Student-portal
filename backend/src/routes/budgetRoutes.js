const express = require("express");
const { getBudgets, createBudget } = require("../controllers/budgetController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBudgets);
router.post("/", protect, createBudget);

module.exports = router;
