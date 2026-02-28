const bcrypt = require('bcryptjs');

const memory = {
  users: [],
  rooms: [],
  messages: [],
  onlineUsers: new Map(),
  roomUsers: new Map()
};

const seedDefaults = async () => {
  const roomNames = ['General', 'Tech Talk', 'Java & Spring', 'Angular Dev', 'DevOps'];
  roomNames.forEach((name) => {
    if (!memory.rooms.find((room) => room.name === name)) {
      memory.rooms.push({ _id: cryptoId(), name, createdAt: new Date() });
    }
  });

  const existing = memory.users.find((u) => u.email === 'gourav@test.com');
  if (!existing) {
    const password = await bcrypt.hash('Test@123', 10);
    memory.users.push({
      _id: cryptoId(),
      username: 'gourav',
      email: 'gourav@test.com',
      password,
      createdAt: new Date()
    });
  }
};

const cryptoId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

module.exports = { memory, seedDefaults, cryptoId };
