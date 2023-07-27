// @ts-nocheck
const express = require("express");
const app = express();
const router = new express.Router();
const dotenv = require("dotenv");

dotenv.config();
app.use(router);

const userController = require("../controller/user.controller");
const productController = require("../controller/productDetails.controller");

router.post("/sendOtp", userController.sendOtp);
router.post("/resendOTP", userController.resendOTP);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/addProduct", productController.addProduct);
router.get("/getProduct", productController.getProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/deleteProduct", productController.deleteProduct);

module.exports = router;
