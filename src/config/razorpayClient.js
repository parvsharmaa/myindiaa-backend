const Razorpay = require('razorpay');

const KEY_ID = 'rzp_test_E7TcxKo2gWiSIA';
const KEY_SECRET = '4tTtcEa7FxJiqBuygRbWg1vl';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET || KEY_SECRET,
});

module.exports = razorpay;
