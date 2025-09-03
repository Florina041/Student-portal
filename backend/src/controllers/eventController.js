import { Event } from "../models/Event.js"

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("society", "name").populate("createdBy", "name email");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, society } = req.body;

    // Inside createEvent
    if (req.user.member.role === "Coordinator") {
      if (req.user.member.society.toString() !== society._id.toString()) {
        return res.status(403).json({ message: "Coordinators can only create events for their own society" });
      }
    }


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

