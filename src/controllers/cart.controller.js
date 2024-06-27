const cartService = require('../services/cart.service');

const findUserCart = async (req, res) => {
  try {
    const user = req.user;
    const cart = await cartService.findUserCart(user._id);
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const user = req.user;
    const cartItem = await cartService.addCartItem(user._id, req.body);
    return res.status(200).send(cartItem);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  findUserCart,
  addItemToCart,
};
