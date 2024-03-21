import { Router } from "express";

import roomRouter from "./room.route";

const router = Router();

router.use("/room", roomRouter);

export default router;
