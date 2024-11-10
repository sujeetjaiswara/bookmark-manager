const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: String,
});

const bookmarkModel = mongoose.model("bookmark", bookmarkSchema);

module.exports = bookmarkModel;
