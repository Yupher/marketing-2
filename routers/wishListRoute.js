const express = require("express");
const wishListController = require("../controllers/wishListController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(wishListController.getAllWishLists) // for developpers
  .post(authController.protect, wishListController.createWishList);

//delete all items from the wishlist
router
  .route("/deleteall")
  .delete(authController.protect, wishListController.deleteAllItems);

//add product from wishlist to cart
router
  .route("/addtocart/:id")
  .post(
    authController.protect,
    authController.restrictTo("client", "admin"),
    wishListController.addToCart
  );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("client", "admin"),
    wishListController.getWishList
  )
  .post(
    authController.protect,
    authController.restrictTo("client", "admin"),
    wishListController.addItem
  )
  .delete(
    authController.protect,
    authController.restrictTo("client", "admin"),
    wishListController.deleteItem
  );

module.exports = router;
