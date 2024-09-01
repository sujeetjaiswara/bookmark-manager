const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const compression = require("compression");

const app = express();

// DATABASE CONNECTION
const configDB = require("./config/database.js");
mongoose.connect(configDB.url);

app.use(logger("dev"));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cookieParser());
app.use(compression());

// Use the session middleware
app.use(
  session({
    store: new MongoStore({
      url: configDB.url,
    }),
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: false,
  })
);

// ROUTING CLIENT
require("./routes/bookmark.js")(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Development error handler
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

module.exports = app;
