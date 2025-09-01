const Event = require("../models/eventModel");

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("society", "name").populate("createdBy", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new event
const createEvent = async (req, res) => {
  try {
    const { title, description, date, society } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      society,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, createEvent };
