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

router.post("/schedule-email", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }

  const { subject, message, scheduleDate } = req.body;

  if (!subject || !message || !scheduleDate) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Get the logged-in user's ID
    const userId = req.user._id;

    // Create a new Letter document
    const newLetter = new Letter({
      subject,
      message,
      scheduleDate,
      owner: userId, // Associate the letter with the user
    });

    // Save the letter to the Letter collection
    await newLetter.save();

    // Add the letter to the user's letter array
    const user = await User.findById(userId);
    user.letter.push(newLetter._id);
    await user.save();

    res.redirect("/profile"); // Redirect to a dashboard or homepage
  } catch (err) {
    console.error("Error scheduling email:", err);
    res.status(500).send("An error occurred while scheduling the email.");
  }
});



module.exports = router;
