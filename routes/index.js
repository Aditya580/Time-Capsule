var express = require("express");
var router = express.Router();

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

module.exports = router;
