import { Society } from "../models/Society.js";

// Create new society
export const createSociety = async (req, res) => {
  try {
    const { name, description } = req.body;
    const society = new Society({ name, description });
    await society.save();
    
    res.status(201).json(society);
  } catch (error) {
    res.status(500).json({ message:"Error creating society",error });
  }
};

// Get all societies
export const getSocieties = async (req, res) => {
  try {
    const societies = await Society.find().populate("members");
    res.json(societies);
  } catch (error) {
    res.status(500).json({ message:"Error fetching societies",error });
  }
};

//Fetching single society
export const getSocietyById = async (req,res) => {
  try{
    const society = await Society.findById(req.params.id).populate("members");
    if(!society) return res.status(404).json({ message: "Society not found" });
    res.json(society);
  }catch(error){
    res.status(500).json({ message: "Error fetching society",error });
  }
};

//Update society details
export const updateSociety = async (req,res) =>{
  try{
    const society = await Society.findByIdAndUpdate(
      req.params.id, 
      req.body, //{ name,description }
      { new:true } //returns updated version
    )//finds society id
    if(!society) return res.status(404).json({ message: "Society not found"});
    res.json(society);
  }catch(error){
    res.status(400).json({ message:"Error updating society",error});
  }
};

//Delete Society
export const deleteSociety = async (req,res) =>{
  try{
    const society = await Society.findByIdAndDelete(req.params.id);
    if(!society) return req.status(404).json({ message:"Society not found"});
    res.json({ message:"Society deleted successfully" });
  }catch(error){
    res.status(500).json({ message:"Error deleting society",error});
  }
}

//Add Member
export const addMember = async (req,res) =>{
  try{
    const society = await Society.findById(req.params.id);
    if(!society) return res.status(404).json({ message:"Society not found" });

    if (req.user.member.role === "Coordinator") {
      if (req.user.member.society.toString() !== society._id.toString()) {
        return res.status(403).json({ message: "Coordinators can only manage their own society" });
      }
    }

    //custom method in society model
    await society.addMember(req.body.memberId);
    res.json(society);
  }catch(error){
    res.status(500).json({ message:"Error adding member",error});
  }
};

//Remove member
export const removeMember = async (req,res) =>{
  try{
    const society = await Society.findById(req.params.id);
    if(!society) return res.status(404).json({ message:"Society not found" });

    if (req.user.member.role === "Coordinator") {
      if (req.user.member.society.toString() !== society._id.toString()) {
        return res.status(403).json({ message: "Coordinators can only manage their own society" });
      }
    }
    //custom method from society model
    await society.removeMember(req.body.memberId);
    res.json(society);
  }catch(error){
    res.status(500).json({ message:"Error removing member",error});
  }
};
