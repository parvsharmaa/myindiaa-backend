const Rating = require('../models/rating.model');
const productService = require('../services/product.service');

async function createRating(req, user) {
  const product = await productService.findProductById(req.productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const rating = new Rating({
    rating: req.rating,
    product: product._id,
    user: user._id,
    createdAt: new Date(),
  });

  return await rating.save();
}

async function getProductRating(productId) {
  const product = await productService.findProductById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  return await Rating.find({ product: product._id });
}

module.exports = {
  createRating,
  getProductRating,
};
