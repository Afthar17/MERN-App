const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../model/usermodel");
//desc  register user
//routes POST /api/users
//access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add all field");
  }
  // Check if the user exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user already exist");
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//desc  Authenticate user
//routes POST /api/users/login
//access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  //check for the password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});
//desc  Get user
//routes GET /api/users/me
//access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//Gnerate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
