const CustomAPIError = require("../errors");

// To check if the user can access another user with id
const checkPersmissions = (requestUser, resourceId) => {
  // if admin let it access
  if (requestUser.role === "admin") return;
  // if his id let it access
  if (requestUser.userId === resourceId.toString()) return;
  // if user want to access another user info not access
  throw new CustomAPIError.Unauthorized("Not authorized to access this route");
};

module.exports = checkPersmissions;
