const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controller/review");
const { authorizePermissions } = require("../middleware/authentication");

router.route("/").get(getAllReviews).post(createReview);

router
  .route("/:id")
  .get(getSingleReview)
  .put(updateReview)
  .delete(deleteReview);

module.exports = router;
