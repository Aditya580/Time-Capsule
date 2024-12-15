var express = require("express");
var router = express.Router();
const passport = require("passport");
const User = require("../models/userSchema");
const Letter = require("../models/letter");
const LocalStrategy = require("passport-local");

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
  (req, res, next) => {


  }
);

router.post('/letter',(req,res,next)=>{


  res.redirect('/');
})


module.exports = router;


