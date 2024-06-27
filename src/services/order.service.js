const cartService = require('../services/cart.service');
const Address = require('../models/address.model');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItems.model');

async function createOrder(user, shipAddress) {
  let address;
  if (shipAddress._id) {
    let existAddress = await address.findbyId(shipAddress._id);
    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();

    user.address.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      discountedPrice: item.discountedPrice,
      size: item.size,
      userId: item.userId,
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discount: cart.discount,
    totalItem: cart.totalItem,
    shipAddress: address,
  });

  const savedOrder = await createdOrder.save();

  return savedOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = 'PLACED';
  order.paymentDetails.status = 'COMPLETED';

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = 'CONFIRMED';

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = 'SHIPPED';

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = 'DELIVERED';

  return await order.save();
}

async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  order.orderStatus = 'CANCELLED';

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate('user')
    .populate({ path: 'orderItems', populate: { path: 'product' } })
    .populate('shippingAddress');
  if (!order) {
    throw new Error('Order not found');
  }

  return order;
}

async function usersOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: 'PLACED',
    })
      .populate({ path: 'orderItems', populate: { path: 'product' } })
      .lean();

    return orders;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getAllOrders() {
  return await Order.find({})
    .populate({
      path: 'orderItems',
      populate: { path: 'product' },
    })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
