var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema");
const Letter = require("../models/letter");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("../middleware/aunth");

passport.use(new LocalStrategy(User.authenticate()));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const unchanged = { username, email };
    const encrypt = password;

    console.log(req.body);
    await User.register(unchanged, encrypt);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  (req, res, next) => {}
);

router.post("/letter", async (req, res) => {
  try {
    const newLetter = new Letter({
      title: req.body.title,
      letter: req.body.letter,
      date: req.body.date,
      createdBy: req.user._id, 
    });

    await newLetter.save();

    req.user.letter.push(newLetter._id);
    await req.user.save();

    console.log("New letter created and linked to user:", newLetter);
    res.redirect("/profile");
  } catch (err) {
    console.log("Error creating letter:", err);
    res.status(400).send("Error creating letter: " + err.message);
  }



});


module.exports = router;
