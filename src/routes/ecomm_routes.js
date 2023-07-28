// @ts-nocheck
const express = require("express");
const app = express();
const router = new express.Router();
const dotenv = require("dotenv");

dotenv.config();
app.use(router);

const {
  authenticator,
  basicApiKeyAuthenticator,
} = require("../controller/authenticator.controller");
const userController = require("../controller/user.controller");
const productController = require("../controller/productDetails.controller");
const ShoppingDetailsController = require("../controller/shoppingDetails.controller");

router.post("/sendOtp", userController.sendOtp);
router.post("/resendOTP", userController.resendOTP);
router.post("/verifyOtp", userController.verifyOtp);
router.post("/addProduct", productController.addProduct);
router.get("/getProduct", authenticator, productController.getProduct);
router.post("/updateProduct", productController.updateProduct);
router.post("/deleteProduct", productController.deleteProduct);
router.post(
  "/addShoppingDetails",
  authenticator,
  ShoppingDetailsController.addShoppingDetails
);
router.post(
  "/updatedShoppingDetails",
  authenticator,
  ShoppingDetailsController.updateShoppingDetails
);
router.delete(
  "/deleteShoppingDetails",
  authenticator,
  ShoppingDetailsController.deleteShoppingDetails
);
router.get(
  "/getShoppingDetails",
  authenticator,
  ShoppingDetailsController.getShoppingDetails
);

module.exports = router;
