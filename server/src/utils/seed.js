const bcrypt = require('bcryptjs');
const Room = require('../models/Room');
const User = require('../models/User');
const { isMemoryStore } = require('../config/db');
const { seedDefaults } = require('./memoryStore');

const seedData = async () => {
  if (isMemoryStore()) {
    await seedDefaults();
    return;
  }

  const rooms = ['General', 'Tech Talk', 'Java & Spring', 'Angular Dev', 'DevOps'];

  for (const name of rooms) {
    const exists = await Room.findOne({ name });
    if (!exists) {
      await Room.create({ name });
    }
  }

  const demoEmail = 'gourav@test.com';
  const user = await User.findOne({ email: demoEmail });
  if (!user) {
    const password = await bcrypt.hash('Test@123', 10);
    await User.create({ username: 'gourav', email: demoEmail, password });
  }
};

module.exports = { seedData };
