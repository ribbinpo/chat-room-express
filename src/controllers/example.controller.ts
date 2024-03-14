import { Request, Response } from "express";
import { validationResult } from "express-validator";

import exampleService from "../services/example.service";

const getAll = async (req: Request, res: Response) => {
  res.send(exampleService.getAll());
};

const createOne = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.status(201).send(exampleService.createOne(req.body));
  }

  res.status(400).send({ errors: result.array() });
};

const updateOne = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    res.send(exampleService.updateOne(req.body));
  }

  res.status(400).send({ errors: result.array() });
};

const deleteOne = async (req: Request, res: Response) => {
  res.send(exampleService.deleteOne());
};

export default {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};
