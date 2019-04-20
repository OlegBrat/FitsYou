const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const Size = require("./models/size");
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

app.post("/api/login", (req, res, next) => {
  let fetchUser;
  User.findOne({ userName: req.body.userName }).then(user => {
    fetchUser = user;
    Size.findOne({ userId: fetchUser._id }).then(userSize => {
      if (!user) {
        return res.status(401).json({
          user: fetchUser,
          message: "Auth Failed",
          size: userSize
        });
      }
      console.log(fetchUser);
      return res.status(200).json({
        user: fetchUser,
        massege: "login sucsseed",
        size: userSize
      });
    });
  });
});

app.post("/api/mySize", (req, res, next) => {
  console.log(req.body);
  const userSize = new Size({
    userId: req.body.userId,
    height: req.body.height,
    weight: req.body.weight,
    legsLength: req.body.legsLength,
    legsHipLine: req.body.legsHipLine,
    bodyLength: req.body.bodyLength,
    bodyBust: req.body.bodyBust,
    bodySholder: req.body.bodySholder,
    bodySleeves: req.body.bodySleeves
  });
  userSize.save().then(() => {
    res.status(201).json({
      message: "size added sucsesfuly"
    });
  });
});

app.get("/api/getsize/:id", (req, res, next) => {
  const userId = req.params.id;
  Size.findOne({ userId: userId }).then(data => {
    console.log(data);
    return res.status(200).json({
      size: data,
      massege: "get Succses"
    });
  });
});

module.exports = app;
