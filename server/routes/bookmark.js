module.exports = (app) => {
  const bookmarkModel = require("../models/bookmark");

  app.get("/bookmarks", (req, res) => {
    bookmarkModel
      .find()
      .sort({ _id: -1 })
      .exec((err, da) => {
        res.send(da);
      });
  });

  // PROJECT DETAILS
  app.get("/bookmark/:id", (req, res) => {
    bookmarkModel.find({ _id: req.params.ID }, (err, da) => {
      res.send(da);
    });
  });
};
