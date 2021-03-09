const categoryModel = require("../models/categoryModel");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handleFactory");

exports.getAllCategory = factory.getAll(categoryModel);

exports.getCategory = factory.getOne(categoryModel);

exports.createCategory = factory.createOne(categoryModel, { addUser: true });

exports.updateCategory = factory.updateOne(categoryModel);

exports.deleteCategory = factory.deleteOne(categoryModel);

exports.categoryOrders = catchAsync(async (req, res, next) => {
  let categoryData = await categoryModel.findById(req.params.id);
  if (!categoryData) {
    return next(new AppError("No category was found", 404));
  }
  let allOrders = await orderModel.find();
  let catOrders = [];
  allOrders.forEach((order) => {
    let { product } = order;

    product.categories.forEach((category) => {
      if (category._id.toString() === req.params.id) {
        catOrders.push(order);
      }
    });
  });
  catOrders = catOrders.reverse();

  if (req.query && req.query.limit) {
    catOrders = catOrders.slice(0, req.query.limit);
  }
  return res.status(200).json({
    status: "success",
    results: catOrders.length,
    data: catOrders,
  });
});

exports.categoryProducts = catchAsync(async (req, res, next) => {
  let categoryData = await categoryModel.findById(req.params.id);
  if (!categoryData) {
    return next(new AppError("No category was found", 404));
  }
  let productData = await productModel.find();
  let catProduct = [];
  productData.forEach((product) => {
    product.categories.forEach((category) => {
      if (category._id.toString() === req.params.id) {
        catProduct.push(product);
      }
    });
  });

  catProduct = catProduct.reverse();

  if (req.query && req.query.limit) {
    catProduct = catProduct.slice(0, req.query.limit);
  }

  return res.status(200).json({
    status: "success",
    results: catProduct.length,
    data: catProduct,
  });
});
