const express = require("express");
const { getSocieties, createSociety } = require("../controllers/societyController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getSocieties);
router.post("/", protect, createSociety);

module.exports = router;
