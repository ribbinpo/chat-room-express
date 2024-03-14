import { Router } from "express";

import exampleController from "../controllers/example.controller";
import exampleSchema from "../schemas/example.schema";

const router = Router();

router.get("/", exampleController.getAll);

router.post("/", exampleSchema.create(), exampleController.createOne);

router.put("/", exampleSchema.update(), exampleController.updateOne);

router.delete("/", exampleController.deleteOne);

export default router;
