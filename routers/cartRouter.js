const express = require("express");
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(cartController.getAllCarts) // for developper
  .post(authController.protect, cartController.createCart);

router
  .route("/purchase")
  .post(
    authController.protect,
    authController.restrictTo("client", "admin"),
    cartController.purchaseAll
  );

router
  .route("/movetowishlist/:id")
  .get(authController.protect, cartController.moveToWishList);
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("client", "admin"),
    cartController.getCart
  )
  .post(
    authController.protect,
    authController.restrictTo("client", "admin"),
    cartController.addItem
  )
  .delete(
    authController.protect,
    authController.restrictTo("client", "admin"),
    cartController.deleteItem
  );

module.exports = router;
