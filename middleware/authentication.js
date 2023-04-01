const CustomAPIError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new CustomAPIError.Unauthenicated("Authenication Invalid");
  }

  try {
    const payload = await isTokenValid(token);
    req.user = payload;
    next();
  } catch (error) {
    throw new CustomAPIError.Unauthenicated("Authenication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.payload.role)) {
      throw new CustomAPIError.Unauthorized(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
