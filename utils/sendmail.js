const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Letter = require("../models/letter");

cron.schedule("* * * * *", async () => {
  console.log("Running email scheduler...");

  try {
    const now = new Date();

    // Fetch unsent letters scheduled for now or earlier
    const lettersToSend = await Letter.find({
      scheduleDate: { $lte: now },
      sent: false,
    }).populate("owner");

    if (lettersToSend.length === 0) {
      console.log("No emails to send at this time.");
      return;
    }

    for (const letter of lettersToSend) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Correctly define mailOptions
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: letter.owner.email,
        subject: letter.subject,
        text: letter.message,
      };

      try {
        // Send email using mailOptions
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${letter.owner.email}`);

        // Mark letter as sent
        letter.sent = true;
        await letter.save();
      } catch (emailError) {
        console.error(`Failed to send email to ${letter.owner.email}:`, emailError);
      }
    }
  } catch (err) {
    console.error("Error during email scheduling task:", err);
  }
});
