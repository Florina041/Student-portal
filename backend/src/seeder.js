const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Models
const User = require("./models/User");
const Society = require("./models/Society");
const Event = require("./models/Event");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Society.deleteMany();
    await Event.deleteMany();

    // Create users
    const users = await User.insertMany([
      { name: "Florina Sahu", email: "florina@example.com", role: "member" },
      { name: "John Doe", email: "john@example.com", role: "lead" },
      { name: "Alice Smith", email: "alice@example.com", role: "coordinator" },
    ]);

    // Create societies
    const societies = await Society.insertMany([
      {
        name: "Coding Club",
        description: "All about programming",
        lead: "John Doe",
        members: [users[0]._id, users[1]._id],
      },
      {
        name: "Drama Society",
        description: "Performing arts",
        lead: "Alice Smith",
        members: [users[2]._id],
      },
    ]);

    // Create events
    const events = await Event.insertMany([
      {
        title: "Hackathon 2025",
        date: new Date("2025-09-30"),
        society: societies[0]._id,
        participants: [users[0]._id, users[1]._id],
        description: "Coding competition for students",
      },
      {
        title: "Drama Night",
        date: new Date("2025-10-15"),
        society: societies[1]._id,
        participants: [users[2]._id],
        description: "A night of performances",
      },
    ]);

    console.log("Data imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
