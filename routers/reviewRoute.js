const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const reviewModel = require("../models/reviewModel");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
//All Review
router.route("/").get(reviewController.getAllReviews);

router
  .route("/me/:id")
  .delete(
    authController.protect,
    authController.permitedTo(reviewModel),
    reviewController.deleteReview,
    reviewController.calculateRatings
  );

//individual Review
router
  .route("/:id")
  .get(reviewController.getReview)
  .post(
    authController.protect,
    authController.restrictTo("client", "admin"),
    reviewController.createReview,
    reviewController.calculateRatings
  )
  .patch(
    authController.protect,
    authController.restrictTo("client", "admin"),
    authController.permitedTo(reviewModel),
    reviewController.updateReview,
    reviewController.calculateRatings
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    reviewController.deleteReview,
    reviewController.calculateRatings
  );

module.exports = router;
