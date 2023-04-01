const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");

const getAllUsers = async (req, res) => {
  let users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({
    users,
  });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");
  if (!user) throw new CustomAPIError.NotFound("No user with this id");
  res.status(StatusCodes.OK).json({
    user,
  });
};

const showCurrentUser = async (req, res) => {
  res.send("Show current user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updateUserPassword = async (req, res) => {
  res.send("Update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
