const router = require("express").Router();
const bookmarkModel = require("../models/bookmark");

router.post("/create", async (req, res) => {
  try {
    const newBookmark = await bookmarkModel.create({
      heading: req.body.heading,
      description: req.body.description,
      date: new Date(),
    });
    res.status(200).json(newBookmark);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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

router.put("/update", async (req, res) => {
  try {
    const query = { _id: req.body.id };
    const updateData = {
      heading: req.body.heading,
      description: req.body.description,
      date: new Date(),
    };
    const newBookmark = await bookmarkModel.findOneAndUpdate(
      query,
      updateData,
      { returnOriginal: false }
    );
    res.status(200).json(newBookmark);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const query = { _id: req.params.id };
  const rs = await bookmarkModel.deleteOne(query);
  res.status(200).json(rs);
});

module.exports = router;
