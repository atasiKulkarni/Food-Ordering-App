const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    restaurantname: String,
    name: String,
    dinein: {
      type: Boolean,
      required: true,
    },
    tablereservation: {
      type: Boolean,
      required: true,
    },
    people: {
      type: Number,
    },
    status: String,
    order: {
      products: [
        {
          item: String,
          price: Number,
          quantity: Number,
        },
      ],
      total: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;