const CartItem = require('../models/cartItem.model');
const userService = require('../services/user.service');

async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const item = await findCartItemById(cartItemId);
    if (!item) {
      throw new Error('Cart item not found');
    }

    const user = await userService.findUserById(item.userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user._id.toString() === userId.toString()) {
      item.quantity = cartItemData.quantity;
      item.price = item.quantity * item.product.price;
      item.discountedPrice = item.quantity * item.product.discountedPrice;

      const updatedCartItem = await item.save();
      return updatedCartItem;
    } else {
      throw new Error('You cannot update this cart item');
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  const cartItem = await findCartItemById(cartItemId);
  if (!cartItem) {
    throw new Error('Cart item not found');
  }

  const user = await userService.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user._id.toString() === cartItem.userId.toString()) {
    return await CartItem.findByIdAndDelete(cartItemId);
  }

  throw new Error('Cannot remove this cart item');
}

async function findCartItemById(cartItemId) {
  const cartItem = await CartItem.findById(cartItemId).populate("product");
  if (cartItem) {
    return cartItem;
  } else {
    throw new Error('Cart item not found');
  }
}

module.exports = {
  updateCartItem,
  removeCartItem,
  findCartItemById,
};
