import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  date: { 
    type: Date, 
    required: true 
  },
  society: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Society" 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);

