const reviewService = require('../services/review.service');

const createReview = async (req, res) => {
  try {
    const user = req.user;
    const review = await reviewService.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllReview = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviews = await reviewService.getAllReview(productId);
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReview,
};
