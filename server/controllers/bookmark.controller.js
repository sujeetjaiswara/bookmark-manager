import Bookmark from "../models/bookmark.model.js";

export const getBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {
    next(error);
  }
};

export const getBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.findOne({ _id: req.params.id });
    res.status(200).json({ success: true, data: bookmark });
  } catch (error) {
    next(error);
  }
};

export const createBookmark = async (req, res, next) => {
  try {
    const bookmark = await Bookmark.create({
      title: req.body.title,
      link: req.body.link,
      tags: req.body.tags,
      description: req.body.description,
      screenshot: req.body.screenshot,
      createdAt: new Date(),
      isFav: 0,
      isDeleted: 0,
    });
    res.status(200).json({ success: true, data: bookmark });
  } catch (error) {
    next(error);
  }
};

export const updateBookmark = async (req, res, next) => {
  try {
    const query = { _id: req.params.id };
    const updateData = {
      title: req.body.title,
      link: req.body.link,
      tags: req.body.tags,
      description: req.body.description,
      screenshot: req.body.screenshot,
      updatedAt: new Date(),
    };
    const updatedBookmark = await Bookmark.findOneAndUpdate(query, updateData, {
      returnOriginal: false,
    });
    res.status(200).json({ success: true, data: updatedBookmark });
  } catch (error) {
    next(error);
  }
};

export const deleteBookmark = async (req, res, next) => {
  try {
    const query = { _id: req.params.id };
    const deletedBookmark = await Bookmark.deleteOne(query);
    if (deletedBookmark.deletedCount === 1) {
      res.status(200).json({
        success: true,
        data: {
          message: "Bookmark successfully deleted",
          deletedId: req.params.id,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        data: {
          message: "Bookmark not found",
          id: req.params.id,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
