const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/usersControler");
const userModel = require("../models/userModel");

const router = express.Router({ mergeParams: true });
//router.use(authController.protect);

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

//user settings update
router
  .route("/me")
  .get(authController.protect, userController.getMe, userController.getUser)
  .patch(authController.protect, userController.getMe, userController.updateMe);

router
  .route("/updatepassword")
  .patch(authController.protect, authController.updatePassword);

router.route("/vendor").get(
  authController.protect,
  authController.restrictTo("admin")
  //userController.getAllVendors
);

//Update vendor informations
router
  .route("/vendor/me")
  .get(
    authController.protect,
    authController.restrictTo("vendor"),
    userController.getVendor
  )
  .patch(
    authController.protect,
    authController.restrictTo("vendor"),
    authController.protect,
    authController.restrictTo("vendor"),
    userController.updateVendor
  );

router
  .route("/vendor/updatepassword")
  .patch(
    authController.protect,
    authController.restrictTo("vendor"),
    authController.updateVendorPassword
  );

module.exports = router;
