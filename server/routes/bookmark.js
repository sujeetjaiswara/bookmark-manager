const router = require("express").Router();
const bookmarkModel = require("../models/bookmark");

router.get("/", async (req, res) => {
  try {
    const bookmarks = await bookmarkModel.find({});
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookmark = await bookmarkModel.find({ _id: req.params.id });
    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
