import express, { Request, Response } from "express";
import bodyParser from "body-parser";

import "dotenv/config";

import router from "./routes";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running :)");
});

app.listen(port, () => {
  console.log(`[server]: Server is running on ${port}`);
});
