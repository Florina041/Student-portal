const Member = require("../models/memberModel");

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate("society", "name");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMember = async (req, res) => {
  try {
    const { name, role, society } = req.body;

    const member = await Member.create({ name, role, society });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMembers, addMember };
