const db = require("../model/shopping.model");
const mongoose = require("mongoose");
const Utils = require("../Utils");

const addShoppingDetails = async (req, res) => {
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const totalAmount = req.body.totalAmount;
  try {
    if (productId == null) {
      return res.status(400).send({
        success: false,
        message: "Product Id cannot be empty",
      });
    } else if (quantity == null) {
      return res.status(400).send({
        success: false,
        message: "Quantity cannot be empty",
      });
    } else if (totalAmount == null) {
      return res.status(400).send({
        success: false,
        message: "Total Amount cannot be empty",
      });
    }

    const shopping = await db.create({
      userId: req.user.userId,
      productId: productId,
      quantity: quantity,
      totalAmount: totalAmount,
    });
    return res.status(200).send({
      success: true,
      message: "Shopping Details Added Successfully",
      data: shopping,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const updateShoppingDetails = async (req, res) => {
  const shoppingId = req.body.shoppingId;
  const quantity = req.body.quantity;
  const totalAmount = req.body.totalAmount;

  try {
    if (shoppingId == null) {
      return res.status(400).send({
        success: false,
        message: "Shopping Id cannot be empty",
      });
    }

    const shopping = await db.findOneAndUpdate(
      { _id: shoppingId },
      { $set: { quantity: quantity, totalAmount: totalAmount } },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Shopping Details Updated Successfully",
      data: shopping,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const deleteShoppingDetails = async (req, res) => {
  const shoppingId = req.body.shoppingId;
  try {
    if (shoppingId == null) {
      return res.status(400).send({
        success: false,
        message: "Shopping Id cannot be empty",
      });
    }
    const shopping = await db.findOneAndDelete({ _id: shoppingId });
    return res.status(200).send({
      success: true,
      message: "Shopping Details Deleted Successfully",
      data: shopping,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const getShoppingDetails = async (req, res) => {
  const shoppingId = req.query.id;
  const productId = req.query.productId;
  try {
    const shopping = await db.aggregate([
      {
        $match: {
          // @ts-ignore
          _id: shoppingId, // Convert to ObjectId

        },
      },
      {
        $lookup: {
          from: "ProductDetails",
          let: {
            productId: "$productId",
            shoppingId: "$_id", // Use the correct field name here
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$productId"] }, // Use $$ notation to access the variables
                  ],
                },
              },
            },
          ],

          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
    ]);

    // const shopping = await db.findById(shoppingId);


    return res.status(200).send({
      success: true,
      message: "Shopping Details Fetched Successfully",
      data: shopping,
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
  addShoppingDetails,
  updateShoppingDetails,
  deleteShoppingDetails,
  getShoppingDetails,
};
