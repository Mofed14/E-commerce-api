const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controller/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser);
module.exports = router;
