var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(User.authenticate()));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, passward, email } = req.body;
    const unchanged = { username, email };
    const encrypt = passward;

    await User.register(unchanged, encrypt);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/index",
    failureRedirect: "/login",
  }),
  (req, res, next) => {}
);

module.exports = router;
