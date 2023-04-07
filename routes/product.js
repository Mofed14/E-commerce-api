const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  clearAllReviews,
} = require("../controller/product");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getSingleProductReviews } = require("../controller/review");

router
  .route("/")
  .get(authenticateUser, getAllProducts)
  .post(authenticateUser, authorizePermissions("admin"), createProduct);
router
  .route("/:id")
  .put(authenticateUser, authorizePermissions("admin"), updateProduct)
  .get(authenticateUser, getSingleProduct)
  .delete(authenticateUser, authorizePermissions("admin"), deleteProduct);
router
  .route("/uploadImage")
  .post(authenticateUser, authorizePermissions("admin"), uploadImage);

router.route("/:id/reviews").get(authenticateUser, getSingleProductReviews);
module.exports = router;
