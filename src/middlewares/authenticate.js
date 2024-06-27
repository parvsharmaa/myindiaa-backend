const jwtProvider = require('../config/jwtProvider');
const userService = require('../services/user.service');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ error: 'token not found' });
    }

    const userId = jwtProvider.getUserIdFromToken(token);
    const user = await userService.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = authenticate;
