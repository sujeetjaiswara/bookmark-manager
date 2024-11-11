const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  screenshot: {
    type: String,
  },
  isFav: {
    type: Number,
  },
  isDeleted: {
    type: Number,
  },
  createdAt: Date,
  updatedAt: Date,
});

const bookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = bookmarkModel;
