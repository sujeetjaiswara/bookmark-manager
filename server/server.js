const express = require("express");
const cors = require("cors");
const bookmarkRoutes = require("./routes/bookmark.js");

const app = express();

app.use(
  cors({
    // Allow Angular app to connect
    origin: "http://localhost:4200",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config();

const connectToDB = require("./config/db.js");
connectToDB();

// Routes
app.use("/bookmarks", bookmarkRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
