const asyncWrapper = require("../middleware/asyncWrapper");
const bcryptjs = require("bcryptjs");

const User = require("../model/user.model");
const { SUCCESS, FAIL } = require("../utils/massageText");
const generateJWT = require("../utils/generateJWT");
const getAllUser = asyncWrapper(async (req, res) => {
  const users = await User.find({}, { __v: false });
  res.status(200).json({ status: SUCCESS, data: { user: users } });
});
const register = asyncWrapper(async (req, res) => {
  const body = req.body;
  const findUser = await User.find({ email: body.email });
  if (!findUser) {
    res
      .status(400)
      .json({ status: FAIL, data: { user: "Email already exists " } });
  }
  const hashedPassword = await bcryptjs.hash(body.password, 10);
  const users = new User({
    ...body,
    password: hashedPassword,
  });
  const token = generateJWT({
    email: users.email,
    id: users.id,
    role: users.role,
  });
  users.token = token;
  await users.save();
  res.status(201).json({ status: SUCCESS, data: { user: users } });
});
const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  const users = await User.findOne({ email });
  const match = bcryptjs.compare(password, users.password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: FAIL, data: { user: "invalid email or password" } });
  }
  if (!users) {
    return res
      .status(400)
      .json({ status: FAIL, data: { user: "user not found" } });
  }
  if (match) {
    const token = generateJWT({
      email: users.email,
      id: users._id,
      role: users.role,
    });
    return res.json({
      status: SUCCESS,
      data: { token },
    });
  } else {
    return res
      .status(400)
      .json({ status: FAIL, message: "Invalid email or password" });
  }
});

module.exports = { getAllUser, register, login };
