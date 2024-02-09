const express = require('express');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME } = require('../constant');
const { User } = require('../schemas/index');

const router = express.Router();


router.get('/ping', (req, res) => {
  res.status(200);
  return res.json({ message: 'pong' });
});


router.post('/signup', async (req, res) => {
  try {
    const userModel = User;
    const { email, name, password } = req.body;
    const user = await userModel.findOne({ 'email': email });
    if (user) {
      res.status(403)
      return res.json({ message: 'User already exist' });
    }
    await userModel.create({
      email, name, password
    });
    res.status(201);
    return res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    return res.json({ message: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({'email': email});
    if (!user) {
      res.status(400);
      return res.json({ message: 'User not found' });
    } else if (user.password === password) {
      const token = jwt.sign({ email, name: user.email, purpose: 'access' }, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: TOKEN_EXP_TIME });
      const refreshToken = jwt.sign({ email, name: user.name, purpose: 'refresh' }, PRIVATE_KEY, { algorithm: 'HS256', expiresIn: REFRESH_TOKEN_EXP_TIME });
      res.status(200);
      return res.json({ token, refreshToken });
    } else if (user.password !== password) {
      res.status(401);
      return res.json({ message: 'Unathourized' });
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    return res.json({ message: 'Unathourized' });
  }
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