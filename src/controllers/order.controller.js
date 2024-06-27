const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
  try {
    const user = req.user;
    let createdOrder = await orderService.createOrder(req.body);
    return res.status(201).send(createdOrder);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const findOrderById = async (req, res) => {
  try {
    let order = await orderService.findOrderById(req.params.id);
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const orderHistory = async (req, res) => {
  try {
    const user = req.user;
    let order = await orderService.usersOrderHistory(user._id);
    return res.status(200).send(order);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
    createOrder,
  findOrderById,
  orderHistory,
};
