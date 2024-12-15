var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");
const Letter = require("../models/letter");
const {isLoggedIn} = require("../middleware/aunth")

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

router.get("/profile",isLoggedIn ,async(req, res, next) => {

  let user = await User.findById(req.user?._id).populate("letter")

  console.log(user)


  res.render("profile" ,{user:req.user});
});

router.get("/letter", isLoggedIn,(req, res, next) => {



  res.render("letter" , {user:req.user});
});


module.exports = router;
