const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  heading: String,
  description: String,
  date: String,
});

const bookmarkModel = mongoose.model("bookmarks", bookmarkSchema);

module.exports = bookmarkModel;
