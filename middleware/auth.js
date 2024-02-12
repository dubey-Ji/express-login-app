const { PRIVATE_KEY, PROTECTED_PATH, PURPOSE } = require('../constant');
const jwt = require('jsonwebtoken');

// const PROTECTED_PATH = ['dashboard'];

function isTokenExpire(expireTime) {
  if ((Math.floor(Date.now() / 1000) - expireTime) < 0) {
    return false;
  }
  return true;
}

function authMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    if (jwt.verify(token, PRIVATE_KEY)) {
      next()
    }
  } catch (error) {
    if (error.message === 'jwt expired') {
      res.status(401);
      return res.json({ message: 'Token expired' });
    } else {
      res.status(400);
      return res.json({ message: 'Unauthorized' });
    }
  }
}

function middleware(req, res, next) {
  const path = req.url.split('/')[2];
  if (PROTECTED_PATH.includes(path)) {
    return authMiddleware(req, res, next);
  }
  next();
}

module.exports = middleware;