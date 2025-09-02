import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  amountInPaise: {
    type: Number,
    required: true,
    min: [0, "Amount must be >= 0"]
  },
  currency: {
    type: String,
    default: "INR",
    uppercase: true,
    trim: true,
    maxlength: 3
  },
  description: { type: String, trim: true },
  category: { type: String, trim: true },
  society: { type: mongoose.Schema.Types.ObjectId, ref: "Society", index: true, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deletedAt: { type: Date, default: null }
}, {
  timestamps: true,
  toJSON: { virtuals: true, transform(doc, ret) { delete ret.__v; } },
  toObject: { virtuals: true }
});

budgetSchema.virtual("amount").get(function () {
  if (this.amountInPaise == null) return null;
  return (this.amountInPaise / 100).toFixed(2);
});

budgetSchema.virtual("amountDecimal").set(function (value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return;
  this.amountInPaise = Math.round(n * 100);
});

budgetSchema.index({ society: 1, createdAt: -1 });

budgetSchema.statics.totalBySociety = async function (societyId, opts = {}) {
  const match = { society: mongoose.Types.ObjectId(societyId) };
  if (opts.from || opts.to) match.createdAt = {};
  if (opts.from) match.createdAt.$gte = opts.from;
  if (opts.to) match.createdAt.$lte = opts.to;

  const res = await this.aggregate([
    { $match: match },
    { $group: { _id: "$society", totalInPaise: { $sum: "$amountInPaise" } } }
  ]);
  return res[0] || { _id: mongoose.Types.ObjectId(societyId), totalInPaise: 0 };
};

const Budget = mongoose.model("Budget", budgetSchema);
export default Budget;
