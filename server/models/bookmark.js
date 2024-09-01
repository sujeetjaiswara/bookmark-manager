const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  Heading: String,
  Desc: String,
  BlogDate: String,
});

const bookmarkModel = mongoose.model("bookmarks", bookmarkSchema);

module.exports = bookmarkModel;
