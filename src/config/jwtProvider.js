const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'djhfjkdbncjkndijscnjds';

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: '48hr' });
  return token;
};

const getUserIdFromToken = (token) => {
  const { userId } = jwt.verify(token, SECRET_KEY);
  return userId;
};

module.exports = {
  generateToken,
  getUserIdFromToken,
};
