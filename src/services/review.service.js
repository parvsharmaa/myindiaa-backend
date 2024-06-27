const Review = require('../models/review.model');
const productService = require('../services/product.service');

async function createReview(reqData, user) {
  const product = await productService.findProductById(reqData.productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const review = new Review({
    review: reqData.review,
    product: product._id,
    user: user._id,
    createdAt: new Date(),
  });

  return await review.save();
}

async function getAllReview(productId) {
  const product = await productService.findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  return await Review.find({ product: product._id }).populate('user');
}

module.exports = {
  createReview,
  getAllReview,
};
