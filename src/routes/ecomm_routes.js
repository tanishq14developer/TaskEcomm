// @ts-nocheck
const express = require("express");
const app = express();
const router = new express.Router();
const dotenv = require("dotenv");

dotenv.config();
app.use(router);

const userController = require("../controller/user.controller");

router.post("/sendOtp", userController.sendOtp);
router.post("/resendOTP", userController.resendOTP);
router.post("/verifyOtp", userController.verifyOtp);

module.exports = router;
