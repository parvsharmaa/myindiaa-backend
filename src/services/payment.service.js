const razorpay = require('../config/razorpayClient');
const orderService = require('./order.service');

const createPaymentLink = async (orderId) => {
  try {
    const order = await orderService.findOrderById(orderId);
    const paymentLinkRequest = {
      amount: order.totalPrice * 100,
      currency: 'INR',
      customer: {
        name: order.user.firstName + ' ' + order.user.lastName,
        email: order.user.email,
        contact: order.user.mobile,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      callback_url: `http://localhost:3000/payment/${orderId}`,
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);
    const paymentLinkId = paymentLink.id;
    const payment_link_url = paymentLink.short_url;

    return {
      paymentLinkId,
      payment_link_url,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePaymentInformation = async (reqData) => {
  const paymentId = reqData.payment_id;
  const orderId = reqData.order_id;

  try {
    const order = await orderService.findOrderById(orderId);
    const payment = await razorpay.payments.fetch(paymentId);
    const paymentStatus = payment.status;

    if (paymentStatus === 'captured') {
      order.paymentDetails.paymentId = paymentId;
      order.paymentDetails.status = 'COMPLETED';
      order.orderStatus = 'PLACED';
      await order.save();
    } else {
      throw new Error('Payment failed');
    }

    return { message: 'Your order has been placed.', success: true };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPaymentLink,
  updatePaymentInformation,
};
