const Cart = require('../models/cart.model');
const CartItem = require('../models/cartItem.model');
const Product = require('../models/product.model');

async function createCart(user) {
  try {
    const cart = new Cart({ user });
    const createdCart = await cart.save();
    return createdCart;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function findUserCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const cartItems = await CartItem.find({ cart: cart._id });

    cart.cartItems = cartItems;

    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.discount = totalPrice - totalDiscountedPrice;
    cart.totalItem = totalItem;

    return cart;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function addCartItem(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    const product = await Product.findById(req.productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });
    if (isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        discountedPrice: product.discountedPrice,
        size: req.size,
      });

      const createdCartitem = await cartItem.save();
      cart.cartItems.push(createdCartitem);
      await cart.save();
      return 'Item added to cart';
    }

    return cart;
  } catch (err) {}
}

module.exports = {
  createCart,
  findUserCart,
  addCartItem,
};
