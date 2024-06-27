const cartItemService = require('../services/cartItem.service');

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItemId = req.params.cartItemId;
    const cartItemData = req.body;

    const updatedCartItem = await cartItemService.updateCartItem(
      userId,
      cartItemId,
      cartItemData
    );
    return res.status(200).send(updatedCartItem);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    await cartItemService.removeCartItem(userId, req.params.id);
    return res.status(200).send({ message: 'Cart item removed successfully' });
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};
