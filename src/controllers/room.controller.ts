import { Request, Response } from "express";
import { validationResult } from "express-validator";

import roomService from "@/services/room.service";
import { ObjectId } from "mongodb";

const getRoomById = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ errors: result.array() });
  }
  const room = await roomService.getRoomById(new ObjectId(req.params.id));

  if (!room) res.status(404).send({ errors: "room is not found" });

  res.send(room);
};

const createRoom = async (req: Request, res: Response) => {
  res.status(201).send(await roomService.createRoom());
};

const joinRoom = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).send({ errors: result.array() });
  }
  const room = await roomService.joinRoom(
    new ObjectId(req.params.id),
    req.body.pass
  );

  if (!room) res.status(404).send({ errors: "room is not found" });

  res.send(room);
};

export default {
  getRoomById,
  createRoom,
  joinRoom,
};
