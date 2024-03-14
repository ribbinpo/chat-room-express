import { body } from "express-validator";

const create = () => {
  return [
    body("name").trim().notEmpty(),
    body("description").trim().notEmpty(),
  ];
};

const update = () => {
  return [
    body("name").trim().optional(),
    body("description").trim().optional(),
  ];
};

export default {
  create,
  update,
};
