const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  society: { type: mongoose.Schema.Types.ObjectId, ref: "Society" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);

