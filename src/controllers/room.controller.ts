import { Request, Response } from "express";
import { validationResult } from "express-validator";

import roomService from "../services/room.service";
import { ObjectId } from "mongodb";

const getRoomById = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.send(roomService.getRoomById(req.query.id as unknown as ObjectId));
  }

  res.status(400).send({ errors: result.array() });
};

const createRoom = async (req: Request, res: Response) => {
  res.status(201).send(roomService.createRoom());
};

export default {
  getRoomById,
  createRoom,
};
