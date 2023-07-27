// @ts-nocheck

const db = require("../model/product.model");


const addProduct = async (req, res) => {
  const { productName, price, mrp, img, discount, description } = req.body;
  try {
    if (productName == null) {
      return res.status(400).send({
        success: false,
        message: "Product Name cannot be empty",
      });
    } else if (price == null) {
      return res.status(400).send({
        success: false,
        message: "Price cannot be empty",
      });
    } else if (mrp == null) {
      return res.status(400).send({
        success: false,
        message: "MRP cannot be empty",
      });
    } else if (img == null) {
      return res.status(400).send({
        success: false,
        message: "Image cannot be empty",
      });
    } else if (discount == null) {
      return res.status(400).send({
        success: false,
        message: "Discount cannot be empty",
      });
    } else if (description == null) {
      return res.status(400).send({
        success: false,
        message: "Description cannot be empty",
      });
    }

    const product = await db.create({
      productName: productName,
      price: price,
      mrp: mrp,
      img: img,
      discount: discount,
      description: description,
    });
    return res.status(200).send({
      success: true,
      message: "Product Added Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { productName, price, mrp, img, discount, description } = req.body;
  try {
    if (productName == null) {
      return res.status(400).send({
        success: false,
        message: "Product Name cannot be empty",
      });
    } else if (price == null) {
      return res.status(400).send({
        success: false,
        message: "Price cannot be empty",
      });
    } else if (mrp == null) {
      return res.status(400).send({
        success: false,
        message: "MRP cannot be empty",
      });
    } else if (img == null) {
      return res.status(400).send({
        success: false,
        message: "Image cannot be empty",
      });
    } else if (discount == null) {
      return res.status(400).send({
        success: false,
        message: "Discount cannot be empty",
      });
    } else if (description == null) {
      return res.status(400).send({
        success: false,
        message: "Description cannot be empty",
      });
    }

    const product = await db.findByIdAndUpdate(
      { _id: productId },
      {
        $set: {
          productName: productName,
          price: price,
          mrp: mrp,
          img: img,
          discount: discount,
          description: description,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (productId == null) {
      const product = await db.find();
      return res.status(200).send({
        success: true,
        message: "Product Fetched Successfully",
        data: product,
      });
    } else {
      const product = await db.findById({ _id: productId });
      return res.status(200).send({
        success: true,
        message: "Product Fetched Successfully",
        data: product,
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

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await db.findByIdAndDelete({ _id: productId });
    return res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  getProduct,
  deleteProduct,
};
