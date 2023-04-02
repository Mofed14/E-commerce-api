const CustomAPIError = require("../errors");
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) throw new CustomAPIError.BadRequest("Email already exists");

  const user = await User.create(req.body);

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);
  res.status(StatusCodes.CREATED).json({
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check if email and password exist
  if ((!email, !password))
    throw new CustomAPIError.BadRequest("please provide email and password");

  const user = await User.findOne({ email: email });

  //  if no user return 401
  if (!user) throw new CustomAPIError.Unauthenicated("Invalid Credentials");

  const isMatch = await user.comparePassword(password);

  // if does not match
  if (isMatch === false)
    throw new CustomAPIError.Unauthenicated("Invalid Credentials");

  // attach cookie
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse(res, tokenUser);

  res.status(StatusCodes.OK).json({
    user: tokenUser,
  });
};

const logout = async (req, res) => {
  // token cookie equal to any string value Because I will expire it anywhere
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
};

module.exports = {
  register,
  login,
  logout,
};
