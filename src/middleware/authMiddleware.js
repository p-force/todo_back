/* eslint-disable consistent-return */
const tokenService = require('../services/tokenService');

module.exports = function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (typeof authorizationHeader === 'string') {
      const accessToken = authorizationHeader.split(' ')[1];
      if (!accessToken) {
        throw new Error('Unauthorized error');
      }
      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        throw new Error('Unauthorized error');
      }
      return next();
    }
    throw new Error('Unauthorized error');
  } catch (error) {
    next(error);
  }
};
