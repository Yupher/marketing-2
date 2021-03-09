const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.getAllReviews = factory.getAll(reviewModel);
exports.getReview = factory.getOne(reviewModel);
exports.createReview = factory.createOne(reviewModel, {
  addUser: true,
  addProduct: true,
  addReviewToProduct: true,
  isMiddleware: true,
});

exports.updateReview = factory.updateOne(reviewModel, { isMiddleware: true });
exports.deleteReview = factory.deleteOne(reviewModel, { isMiddleware: true });

exports.calculateRatings = catchAsync(async (req, res, next) => {
  // //this is for updating rating average and quantity
  let allReviews = await reviewModel.find({ product: req.body.product });
  let productData = await productModel.findById(req.body.product);

  //check if this product exists in data base
  if (!productData) {
    return next(
      new AppError(`No product found with this id ${req.body.product}`)
    );
  }
  //check if there is reviews for this product
  if (allReviews) {
    let ratingsQuantity = productData.reviews.length;
    let ratingsAverage;

    let ratingsTotal = 0;
    productData.reviews.forEach((elm) => {
      ratingsTotal = ratingsTotal + elm.rating;
    });

    ratingsAverage =
      ratingsQuantity === 0 ? 4.5 : ratingsTotal / ratingsQuantity;

    productData.ratingsQuantity = ratingsQuantity;
    productData.ratingsAverage = ratingsAverage;

    await productData.save();
  }

  return res.status(200).json({
    status: "success",
    data: req.body.review,
  });
});
