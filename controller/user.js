const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPersmissions,
} = require("../utils");

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
  checkPersmissions(req.user.payload, user._id);
  res.status(StatusCodes.OK).json({
    user,
  });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user.payload });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    throw new CustomAPIError.BadRequest("Please provide email and name");
  const user = await User.findOne({ _id: req.user.payload.userId });

  user.email = email;
  user.name = name;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { newPassword, oldPasswprd } = req.body;

  // Check if the user enter the new and old password
  if ((!newPassword, !oldPasswprd)) {
    throw new CustomAPIError.BadRequest(
      "Please Provide old password, and new password"
    );
  }

  // look for user with req.user.userId
  const user = await User.findOne({ _id: req.user.payload.userId });

  // check if oldPassword matches with user.comparePassword
  const isMatch = await user.comparePassword(oldPasswprd);
  if (isMatch === false) {
    throw new CustomAPIError.BadRequest("The old password is incorrect");
  }

  // if everything good set user.password equal to newPassword
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
