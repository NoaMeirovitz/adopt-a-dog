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
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

const Users = mongoose.model("users", userSchema);

module.exports = {
  Users,
};

// (async function () {
//   const users = await Users.find();
//   for (const user of users) {
//     console.log(user.username);
//     if (user.username === "admin") {
//       user.role = "admin";
//     } else {
//       user.role = "user";
//     }
//     await user.save();
//   }
// })();
