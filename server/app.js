import express from "express";
import cors from "cors";
import bookmarkRouter from "./routes/bookmark.routes.js";
import connectToDB from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Allow cors
app.use(cors({ origin: "http://localhost:4200" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the Bookmark API!");
});

// Routes
app.use("/api/v1/bookmark", bookmarkRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToDB();
});

export default app;
