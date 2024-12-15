const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Letter = require("./models/Letter");

// Schedule a task to run every minute
cron.schedule("* * * * *", async () => {
    console.log("Running email scheduler...");

    const now = new Date();  // Get current time
    const lettersToSend = await Letter.find({
        scheduleDate: { $lte: now },  // Find letters scheduled for now or earlier
        sent: false,  // Only unsent letters
    }).populate("owner");  // Populate the owner field (User)

    lettersToSend.forEach(async (letter) => {
        // Access the owner's email from the populated field
        const recipientEmail = letter.owner.email;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.forget-mail,
                pass: process.env.f-mail-password,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  // Sender's email
            to: recipientEmail,            // Recipient's email
            subject: letter.subject,       // Email subject
            text: letter.message,          // Email body
        };

        try {
            await transporter.sendMail(mailOptions);  // Send the email
            letter.sent = true;  // Mark the letter as sent
            await letter.save();  // Save the updated letter
            console.log(`Email sent to ${recipientEmail}`);
        } catch (err) {
            console.error(`Error sending email to ${recipientEmail}:`, err);
        }
    });
});
