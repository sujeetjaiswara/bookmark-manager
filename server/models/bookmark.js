const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  heading: String,
  description: String,
  date: String,
});

const bookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = bookmarkModel;
