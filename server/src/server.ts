import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import user from "./routes/userRoute";
// import publisher from "./routes/publisherRoute";
import news from "./routes/newsRoute";
import comment from "./routes/commentRoute";
import vote from "./routes/voteRoute";
import connectDB from './db';
import allNews from "./routes/getallnews";

const app = express();
connectDB();
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL (adjust accordingly)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow other methods as needed
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allow additional headers if required
  credentials: true, // If you're using cookies or sessions
}));


// Routes
app.use("/api/v1/user", user);
// app.use("/api/v1/publisher", publisher);
app.use("/api/v1/all", allNews);
app.use("/api/v1/news", news);
app.use("/api/v1/comment", comment);
app.use("/api/v1/vote", vote);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


