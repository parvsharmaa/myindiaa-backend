const orderService = require('../services/order.service');

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const confirmedOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orders = await orderService.confirmedOrder(orderId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const shipOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orders = await orderService.shipOrder(orderId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deliverOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orders = await orderService.deliverOrder(orderId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const cancelledOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orders = await orderService.cancelOrder(orderId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orders = await orderService.deleteOrder(orderId);
    return res.status(200).send(orders);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrders,
  shipOrders,
  deliverOrders,
  cancelledOrders,
  deleteOrders,
};
