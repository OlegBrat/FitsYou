const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const bodyParser = require("body-parser");
const app = express();

mongoose
  .connect(
    "mongodb+srv://oleg:JmZIOfNiN17uWdLu@fitsyou-zoixq.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("sucssessfuly connected!");
  })
  .catch(() => {
    console.log("failed to connect...");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/signup", (req, res, next) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password
  });

  user.save().then(() => {
    res.status(201).json({
      massege: "user Added"
    });
  });
});

module.exports = app;
