const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '365d' });
};

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.signup(username._value, password._value);

    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      lastUpdated: user.updatedAt,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username._value, password._value);

    const token = createToken(user._id);

    res.status(200).json({
      username: user.username,
      lastUpdated: user.updatedAt,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, login };
