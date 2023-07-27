// @ts-nocheck
const jwt = require("jsonwebtoken");
const db = require("../model/UserInfo");
const Utils = require("../Utils");

const sendOtp = async (req, res) => {
  try {
    const mobileNo = req.body.mobileNo;
    if (mobileNo == null) {
      return res.status(400).send({
        success: false,
        message: "Mobile Number cannot be empty",
      });
    } else if (!Utils.isValidphonenumber(mobileNo)) {
      return res.status(400).send({
        success: false,
        message: "Please enter vaild mobile number",
      });
    } else {
      const now = new Date();
      const expiration_time = Utils.AddMinutesToDate(now, 10);

      const user = await db.findOne({ mobileNo: mobileNo });

      let newOtp = Utils.generateOTP();

      if (user == null) {
        await db.create({
          mobileNo: mobileNo,
          otp: newOtp,
          expiration_time: expiration_time,
        });

        return res.status(200).send({
          success: true,
          message: "OTP successfully has been sent",
        });
      } else {
        const data = await db.findOneAndUpdate(
          { mobileNo: mobileNo },
          { $set: { otp: newOtp, expiration_time: expiration_time } },
          { new: true }
        );

        return res.status(200).send({
          success: true,
          message: "OTP successfully has been sent",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const mobileNo = req.body.mobileNo;
    if (mobileNo == null) {
      return res.status(400).send({
        success: false,
        message: "Mobile Number cannot be empty",
      });
    } else if (!Utils.isValidphonenumber(mobileNo)) {
      return res.status(400).send({
        success: false,
        message: "Please enter vaild mobile number",
      });
    } else {
      await db.findOneAndUpdate(
        { mobileNo: mobileNo },
        { $set: { otp: newOtp, expiration_time: expiration_time } }
      );
      return res.status(200).send({
        success: true,
        message: "OTP successfully has been sent",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let values = {};
    const currentdate = new Date();
    const mobile = req.body.mobileNo;
    const otp = req.body.otp;
    if (mobile == null || mobile == "") {
      return res.status(400).send({
        success: false,
        message: "Mobile number cannot be empty",
      });
    }

    if (!Utils.isValidphonenumber(mobile)) {
      return res.status(400).send({
        success: false,
        message: "Please enter vaild mobile number",
      });
    }

    if (otp == null || otp == "") {
      return res.status(400).send({
        success: false,
        message: "Otp cannot be empty",
      });
    }
    const user = await db.findOne({ mobileNo: mobile }).then((value) => {
      values = value;
    });

    if (values["mobileNo"] == null)
      return res.status(400).send({
        success: false,
        message: "Mobile number invalid",
      });

    const access_token = jwt.sign(
      { userId: values["_id"], mobile: values["mobileNo"] },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    // console.log("jwt tak chala====>>>" + values.expiration_time);

    if (Utils.dates.compare(values["expiration_time"], currentdate) == 1) {
      if (values["otp"] != otp) {
        return res.status(401).send({
          success: false,
          message: "Please enter a valid OTP",
        });
      }

      await db.findOneAndUpdate(
        { mobileNo: mobile },
        { $set: { expiration_time: currentdate } }
      );

      if (values["name"] == null) {
        return res.status(200).send({
          success: true,
          message: "OTP Verified",
          access_token: access_token,
          expiry: 2592000,
        });
      } else {
        return res.status(200).send({
          success: true,
          message: "OTP Verified",
          accessToken: access_token,
          expiry: 2592000,
        });
      }
    } else {
      return res.status(400).send({
        success: false,
        message: "OTP has been expired",
      });
    }
  } catch (error) {
    console.log("VerifyOTP:" + error.message);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  resendOTP,
};
