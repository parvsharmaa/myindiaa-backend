require('dotenv').config();

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const { validate } = require('./middlewares/validation');

const fs = require('fs');
const path = require('path');
const https = require('https');

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
const logisticsRoutes = require('./routes/logistics.route');
const domainRoutes = require('./routes/domain.route');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // Security headers

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

app.use('/api/', apiLimiter);

// Data validation
app.use(validate);

// Routes
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
app.use('/api/logistics', logisticsRoutes);
app.use('/api/domains', domainRoutes);

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'API is active' });
});

// SSL/TLS setup
let sslOptions;
try {
  sslOptions = {
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
  };
} catch (error) {
  console.error('Error reading SSL key or certificate:', error.message);
  process.exit(1);
}

const server = https.createServer(sslOptions, app);

const PORT = process.env.PORT || 5001;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on PORT ${PORT} 🚀`);
});

module.exports = app;
