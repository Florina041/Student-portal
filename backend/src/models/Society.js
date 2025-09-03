import mongoose from "mongoose";

const societySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  lead: { 
    type: String, 
    required: true, 
    trim: true 
  },
  membersCount: {   // numeric count, not the refs
    type: Number, 
    default: 0, 
    min: [0, "Members cannot be negative"] 
  },
  members: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Member" 
    }
  ]
}, { timestamps: true });


//some methods
societySchema.methods.addMember = async function(memberId){
  if(!this.members.includes(memberId)){
    this.members.push(memberId);
    await this.save();
  }
  return this;
};

societySchema.methods.removeMember = async function(memberId){
  this.members = this.members.filter(
    (id) => id.toString() !== memberId.toString()
  );//exludes given memberId
  await this.save();
  return this; //updated society
};

societySchema.methods.isMember = async function(memberId){
  return this.members.some((id) => id.toString() === memberId.toString());
};//.some() -> true or false 

export const Society = mongoose.model("Society", societySchema);

