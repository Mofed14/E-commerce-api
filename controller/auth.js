const CustomAPIError = require("../errors");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils");
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) throw new CustomAPIError.BadRequest("Email already exists");

  const user = await User.create(req.body);

  attachCookiesToResponse(res, {
    userId: user._id,
    email: user.email,
    name: user.name,
  });
  res.status(201).json({
    user,
  });
};

const login = async (req, res) => {
  console.log(req.body);
  res.send("Login API");
};

const logout = async (req, res) => {
  res.send("Logout API");
};

module.exports = {
  register,
  login,
  logout,
};
