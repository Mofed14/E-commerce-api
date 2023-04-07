const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controller/order");
const { authorizePermissions } = require("../middleware/authentication");

router
  .route("/")
  .get(authorizePermissions("admin"), getAllOrders)
  .post(createOrder);
router.route("/showAllMyOrders").get(getCurrentUserOrders);
router.route("/:id").put(updateOrder).get(getSingleOrder);

module.exports = router;
