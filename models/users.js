const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User name is missing"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is missing"],
  },
  address: {
    type: String,
    required: [true, "Address is missing"],
  },
  phone: {
    type: String,
    required: [true, "Phone is missing"],
  },
  forgotPasswordAnswer: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = {
  Users,
};
