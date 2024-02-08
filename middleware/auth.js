const { PRIVATE_KEY } = require('../constant');
const jwt = require('jsonwebtoken');

const PROTECTED_PATH = ['dashboard'];

function isTokenExpire(expireTime) {
  if ((Math.floor(Date.now() / 1000) - expireTime) < 0) {
    return false;
  }
  return true;
}

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  const decodedToken = jwt.decode(token);
  if (jwt.verify(token, PRIVATE_KEY) && jwt.verify(token, PRIVATE_KEY).purpose === 'access') {
    if (!isTokenExpire(decodedToken.exp)) {
      next();
    } else {
      res.status(400);
      return res.json({ message: 'Unathorized' });
    }
  } else if (jwt.verify(token, PRIVATE_KEY) && jwt.verify(token, PRIVATE_KEY).purpose === 'refresh') {
    if (!isTokenExpire(decodedToken.exp)) {
      next('/refreshToken');
    } else {
      res.statu(400);
      return res.json({ message: 'Unathorized' });
    }
  }
  res.statu(400);
  return res.json({ message: 'Unathorized' });
}

function middleware(req, res, next) {
  const path = req.url.split('/')[2];
  if (PROTECTED_PATH.includes(path)) {
    authMiddleware(req, res, next);
  }
  next();
}

module.exports = middleware;