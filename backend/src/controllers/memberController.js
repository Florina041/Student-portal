import { Member } from "../models/Member.js"
import { Society } from "../models/Society.js";
export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate("society", "name");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMember = async (req, res) => {
  try {
    const { name, role, society } = req.body;

    const targetSociety = await Society.findById(society);
    if (!targetSociety) {
      return res.status(404).json({ message: "Society not found" });
    }

    if (req.user.member.role === "Coordinator") {
      if (req.user.member.society.toString() !== society.toString()) {
        return res.status(403).json({ message: "Coordinators can only add members to their own society"});
      }
    }



    const member = await Member.create({ name, role, society });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

