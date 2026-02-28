const Room = require('../models/Room');
const Message = require('../models/Message');
const User = require('../models/User');
const { isMemoryStore } = require('../config/db');
const { memory, cryptoId } = require('../utils/memoryStore');

const getUsers = async (_req, res) => {
  const onlineIds = [...memory.onlineUsers.keys()];

  if (isMemoryStore()) {
    const users = memory.users
      .filter((user) => onlineIds.includes(user._id.toString()))
      .map((user) => ({ id: user._id.toString(), username: user.username, email: user.email }));
    return res.json(users);
  }

  const users = await User.find({ _id: { $in: onlineIds } }).select('_id username email');
  return res.json(users.map((user) => ({ id: user._id.toString(), username: user.username, email: user.email })));
};

const getRooms = async (_req, res) => {
  if (isMemoryStore()) {
    return res.json(memory.rooms);
  }

  const rooms = await Room.find().sort({ createdAt: 1 });
  return res.json(rooms);
};

const createRoom = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Room name is required' });
  }

  if (isMemoryStore()) {
    const room = { _id: cryptoId(), name, createdAt: new Date() };
    memory.rooms.push(room);
    return res.status(201).json(room);
  }

  const room = await Room.create({ name });
  return res.status(201).json(room);
};

const getMessages = async (req, res) => {
  const { id } = req.params;

  if (isMemoryStore()) {
    const messages = memory.messages
      .filter((message) => message.roomId === id)
      .slice(-50);
    return res.json(messages);
  }

  const messages = await Message.find({ roomId: id }).sort({ createdAt: -1 }).limit(50);
  return res.json(messages.reverse());
};

module.exports = { getUsers, getRooms, createRoom, getMessages };
