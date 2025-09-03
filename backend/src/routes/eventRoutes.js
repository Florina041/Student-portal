import express from "express";
import { getEvents,createEvent } from "../controllers/eventController";
import { protect,isCoordinatorOrAbove } from "../middleware/authMiddleware";

const router = express.Router();

//public
router.get("/", getEvents);

//restricted to Coordinator + Admin + SuperAdmin
router.post("/", protect,isCoordinatorOrAbove,createEvent);

export default router;
