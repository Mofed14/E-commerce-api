const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controller/user");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin", "owner"), getAllUsers);
router.route("/:id").get(authenticateUser, getSingleUser);
router.route("/showeMe").get(showCurrentUser);
router.route("/updateUser").put(updateUser);
router.route("/updateUserPassword").put(updateUserPassword);

module.exports = router;
