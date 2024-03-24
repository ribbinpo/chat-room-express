import { Router } from "express";
import { body, param } from "express-validator";

import roomController from "@/controllers/room.controller";

const router = Router();

// getRoomById
router.get("/:id", param("id").isMongoId(), roomController.getRoomById);

// createRoom
router.post("/", roomController.createRoom);

// joinRoom
router.post(
  "/join/:id",
  [
    param("id").isMongoId(),
    body("pass").isString().isLength({ min: 6, max: 6 }),
  ],
  roomController.joinRoom
);

export default router;
