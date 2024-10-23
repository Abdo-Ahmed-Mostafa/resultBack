const mongoose = require("mongoose");
const validator = require("validator");
const { USER, ADMIN, MANGER } = require("../utils/user-roule");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "filed mast be a valid email address"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [USER, ADMIN, MANGER],
    default: USER,
  },
  avatar: {
    type: String,
    default: "/uploads/profile.webp ",
  },
});
const users = mongoose.model("User", userSchema);
module.exports = users;
