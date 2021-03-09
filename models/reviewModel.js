const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review can not be empty!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please rate this product before you submit!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "product",
    required: [true, "Review must belong to a  product."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});
reviewSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const review = mongoose.model("review", reviewSchema);
module.exports = review;
