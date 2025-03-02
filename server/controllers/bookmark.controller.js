import Bookmark from "../models/bookmark.model.js";

// Helper function for consistent error handling
const handleError = (res, error) => {
  console.error("Bookmark operation error:", error);
  return res.status(500).json({
    success: false,
    error: error.message || "An error occurred",
  });
};

export const getBookmarks = async (req, res) => {
  try {
    // Added filtering options with defaults
    const { limit = 50, skip = 0, showDeleted = false } = req.query;
    const query = showDeleted ? {} : { isDeleted: false };

    const bookmarks = await Bookmark.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await Bookmark.countDocuments(query);

    res.status(200).json({
      success: true,
      data: bookmarks,
      pagination: {
        total,
        limit: Number(limit),
        skip: Number(skip),
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({
        success: false,
        data: { message: "Bookmark not found" },
      });
    }

    res.status(200).json({ success: true, data: bookmark });
  } catch (error) {
    handleError(res, error);
  }
};

export const createBookmark = async (req, res) => {
  try {
    // Parse tags if they come as a comma-separated string
    let tags = req.body.tags || [];
    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    const bookmark = await Bookmark.create({
      title: req.body.title,
      link: req.body.link,
      tags,
      description: req.body.description,
      screenshot: req.body.screenshot,
      isFav: Boolean(req.body.isFav),
      isDeleted: false,
    });

    res.status(201).json({ success: true, data: bookmark });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateBookmark = async (req, res) => {
  try {
    // Parse tags if they come as a comma-separated string
    let tags = req.body.tags;
    if (typeof tags === "string") {
      tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    const updateData = {
      ...(req.body.title && { title: req.body.title }),
      ...(req.body.link && { link: req.body.link }),
      ...(tags && { tags }),
      ...(req.body.description !== undefined && {
        description: req.body.description,
      }),
      ...(req.body.screenshot !== undefined && {
        screenshot: req.body.screenshot,
      }),
      ...(req.body.isFav !== undefined && { isFav: Boolean(req.body.isFav) }),
    };

    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBookmark) {
      return res.status(404).json({
        success: false,
        data: { message: "Bookmark not found" },
      });
    }

    res.status(200).json({ success: true, data: updatedBookmark });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteBookmark = async (req, res) => {
  try {
    // Option for soft delete
    const { permanent = false } = req.query;

    if (permanent === "true") {
      // Hard delete
      const result = await Bookmark.findByIdAndDelete(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          data: {
            message: "Bookmark not found",
            id: req.params.id,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          message: "Bookmark permanently deleted",
          deletedId: req.params.id,
        },
      });
    } else {
      // Soft delete
      const updatedBookmark = await Bookmark.findByIdAndUpdate(
        req.params.id,
        { isDeleted: true },
        { new: true }
      );

      if (!updatedBookmark) {
        return res.status(404).json({
          success: false,
          data: {
            message: "Bookmark not found",
            id: req.params.id,
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          message: "Bookmark moved to trash",
          deletedId: req.params.id,
        },
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// New endpoint to restore deleted bookmarks
export const restoreBookmark = async (req, res) => {
  try {
    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );

    if (!updatedBookmark) {
      return res.status(404).json({
        success: false,
        data: {
          message: "Bookmark not found",
          id: req.params.id,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        message: "Bookmark restored successfully",
        bookmark: updatedBookmark,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};
