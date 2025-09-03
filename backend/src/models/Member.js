import mongoose from "mongoose"

const memberSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    required: true,
    enum:["Student","Coordinator","Admin","SuperAdmin"],
    default:"Student"
  },
  society: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Society" 
  },
}, { timestamps: true });

export const Member = mongoose.model("Member", memberSchema);
