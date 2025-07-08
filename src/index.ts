import dotenv from "dotenv";
import express, { Request, Response } from "express";
import documentRouter from "./routes/document";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
// app.use("/api");

app.get("/api/healthcheck", (_: Request, res: Response) => {
  res.status(200).send("App is running");
});

app.use("/api/documents", documentRouter);

const server = app.listen(PORT, () => {
  console.log(`App listnening on port ${PORT}`);
});

server.on("error", (err: any) => {
  console.error(err);
});
