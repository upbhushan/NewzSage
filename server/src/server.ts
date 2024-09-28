import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import mainRouter from "./routes/index";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/api/v1", mainRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Example route
app.get("/", (req: Request, res: Response) => {
  res.json("Hello World");
});
