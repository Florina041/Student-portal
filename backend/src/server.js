// src/server.js
const express = require("express");
const cors = require("cors");
const societies = require("./data/societies"); // Import societies array

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("✅ KSAC Backend is running...");
});

app.get("/societies", (req, res) => {
  res.json(societies);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});