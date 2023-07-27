const mongoose = require("mongoose");
const ProductInfo = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: false,
      default: null,
    },
    price: {
      type: Number,
      default: null,
    },
    mrp: {
      type: Number,
      unique: true,
      required: true,
    },
    img: {
      type: String,
      unique: false,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("ProductDetails", ProductInfo);
