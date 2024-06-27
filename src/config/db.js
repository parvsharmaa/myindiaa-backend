const mongoose = require('mongoose');

const dbUrl =
  'mongodb+srv://test:test123@cluster0.mzvx9x7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL || dbUrl);
    console.log('Database connected');
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = { connectDB };
