import { Router } from "express";
import { query } from "express-validator";

import roomController from "../controllers/room.controller";

const router = Router();

// getRoomById
router.get("/", query("id").isMongoId(), roomController.getRoomById);

// createRoom
router.post("/", roomController.createRoom);

export default router;
