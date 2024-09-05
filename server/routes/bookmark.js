module.exports = (app) => {
  const bookmarkModel = require("../models/bookmark");

  app.get("/", (req, res) => {
    bookmarkModel
      .find()
      .sort({ _id: -1 })
      .exec((err, da) => {
        res.send(da);
      });
  });

  // PROJECT DETAILS
  app.get("/:id", (req, res) => {
    bookmarkModel.find({ _id: req.params.ID }, (err, da) => {
      res.send(da);
    });
  });
};
