import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  link: {
    type: String,
    required: [true, "Link is required"],
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

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
