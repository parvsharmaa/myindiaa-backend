const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('Database connected');
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = { connectDB };
