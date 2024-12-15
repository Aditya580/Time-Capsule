var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");
const Letter = require("../models/letter");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/forget", (req, res, next) => {
  res.render("forget");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/letter", (req, res, next) => {



  
  res.render("letter");
});


module.exports = router;
