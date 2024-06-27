require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route');
const adminproductsRoutes = require('./routes/adminProduct.route');
const cartRoutes = require('./routes/cart.route');
const reviewRoutes = require('./routes/review.route');
const orderRoutes = require('./routes/order.route');
const ratingRoutes = require('./routes/rating.route');
const adminOrderRoutes = require('./routes/adminOrder.route');
const cartItemRoutes = require('./routes/cartItem.route');
const paymentRoutes = require('./routes/payment.route');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'api is active' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin/products', adminproductsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/cart_items', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  await connectDB();
  `Server is listening on PORT ${PORT}`;
});

module.exports = app;
