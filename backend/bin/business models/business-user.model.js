const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const businessSignupSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    fullname: {
      type: String,
      required: true,
      minlength: 3,
    },
    restaurantname: {
      type: String,
      required: true,
      minlength: 3,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 3,
    },
    address: {
      type: String,
      required: true,
      minlength: 7,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
    },
    cnic: {
      type: String,
      required: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const businessUser = mongoose.model("Business User", businessSignupSchema);

module.exports = businessUser;