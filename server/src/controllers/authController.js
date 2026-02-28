const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isMemoryStore } = require('../config/db');
const { memory, cryptoId } = require('../utils/memoryStore');
const { signToken } = require('../utils/token');

const sanitizeUser = (user) => ({ id: user._id.toString(), username: user.username, email: user.email });

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'username, email and password are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (isMemoryStore()) {
    const exists = memory.users.find((user) => user.email === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = { _id: cryptoId(), username, email: email.toLowerCase(), password: hashedPassword };
    memory.users.push(user);
    const token = signToken(sanitizeUser(user));
    return res.status(201).json({ user: sanitizeUser(user), token });
  }

  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const user = await User.create({ username, email: email.toLowerCase(), password: hashedPassword });
  const token = signToken(sanitizeUser(user));
  return res.status(201).json({ user: sanitizeUser(user), token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'email and password are required' });
  }

  let user;
  if (isMemoryStore()) {
    user = memory.users.find((entry) => entry.email === email.toLowerCase());
  } else {
    user = await User.findOne({ email: email.toLowerCase() });
  }

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = sanitizeUser(user);
  const token = signToken(payload);
  return res.json({ user: payload, token });
};

module.exports = { register, login };
