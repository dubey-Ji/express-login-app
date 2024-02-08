const express = require('express');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } = require('../constant');
const { users } = require('../users');

const router = express.Router();


router.get('/ping', (req, res) => {
  res.status(200);
  return res.json({ message: 'pong' });
});


router.post('/signup', (req, res) => {
  const { email, name, password } = req.body;
  const user = users.find(u => {
    return u.email === email;
  });
  if (user) {
    res.status(403)
    return res.json({ message: 'User already exist' });
  }
  users.push({ email, name, password });
  res.status(201);
  return res.json({ message: 'success' });
});

router.post('/login', (req, res) => {
  let { email, password } = req.body;
  const user = users.find(u => {
    return u.email === email;
  });
  if (!user) {
    res.status(400);
    return res.json({ message: 'User not found' });
  }
  if (user.password === password) {
    const token = jwt.sign({ email, name: user.email, purpose: 'access' }, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: TOKEN_EXP_TIME });
    const refreshToken = jwt.sign({ email, name: user.name, purpose: 'refresh' }, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: REFRESH_TOKEN_EXP_TIME });
    res.status(200);
    return res.json({ token, refreshToken });
  }
  res.status(401);
  return res.json({ message: 'Unathourized' });
});

router.get('/refreshToken', (req, res) => {
  let refreshToken = req.headers['authorization'].split(' ')[1];
  if (jwt.verify(refreshToken, PRIVATE_KEY).purpose === 'refresh') {
    let userInfo = jwt.decode(refreshToken);
    let token = jwt.sign({ email: userInfo.email, name: userInfo.name, purpose: 'access' }, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: TOKEN_EXP_TIME });
    res.status(200);
    return res.json({ token });
  }
  res.status(400);
  return res.json({ message: 'Unathourized' });
});

router.get('/dashboard', (req, res) => {
  res.status(200);
  return res.json({ message: 'Protected Path' });
});

module.exports = router;