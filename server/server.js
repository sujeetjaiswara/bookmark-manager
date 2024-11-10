const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const configDB = require("./config/db.js");
const bookmarkRoutes = require("./routes/bookmark.js");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
