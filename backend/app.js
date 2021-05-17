const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://127.0.0.1/assignment",
  { useUnifiedTopology: true, useNewUrlParser: true },
  function (err) {
    if (err) console.log(err);
    else {
      console.log("------------Assignment Database connected------------");
    }
  }
);
const employee = require('./apis/employee')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this route can be used to ensure other webpages can't access your api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use('/employee', employee); // user routes

app.use((req, res, next) => {
  const error = new Error("No route with this corresponding URL was found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
