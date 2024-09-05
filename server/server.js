const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const configDB = require("./config/database.js");
const bookmarkRoutes = require("./routes/bookmark.js");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const main = async () => {
  await mongoose.connect(configDB.url);
};

// Connect to MongoDB
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/bookmarks", bookmarkRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
