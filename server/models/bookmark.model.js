import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: 2,
      maxLength: 200,
      index: true,
    },
    link: {
      type: String,
      required: [true, "Link is required"],
      validate: {
        validator: function (v) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
        },
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    tags: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    screenshot: {
      type: String,
      default: null,
    },
    isFav: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookmarkSchema.index({ isDeleted: 1, isFav: 1 });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
