// @ts-nocheck
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const shoppingModel = require("./src/model/shopping.model");
const route = require("./src/routes/ecomm_routes");
require("./src/db/db");

const app = express();
const server = require("http").createServer(app);

async function checkOrdersAndSendEmail() {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const ordersPlaced60MinutesAgo = await shoppingModel.find({
    createdAt: { $gte: oneHourAgo, $lte: now },
  });
  console.log("Orders placed 60 minutes ago:", ordersPlaced60MinutesAgo);

  for (let i = 0; i < ordersPlaced60MinutesAgo.length; i++) {
    const order = ordersPlaced60MinutesAgo[i];
    console.log("Order:", ordersPlaced60MinutesAgo);

    const customerEmail = order.email;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APPPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: customerEmail,
      subject: "Order Cart Update",
      text: "Hey, your order is still waiting in your cart.",
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }
}

app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

app.use(route);
cron.schedule("* * * * *", () => {
  console.log("Running cron job...");
  checkOrdersAndSendEmail();
});
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`App running on port:: 🎉 ${PORT}`);
});
