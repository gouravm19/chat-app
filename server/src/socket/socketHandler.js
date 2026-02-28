const Message = require('../models/Message');
const { isMemoryStore } = require('../config/db');
const { memory, cryptoId } = require('../utils/memoryStore');

const roomSet = (roomId) => {
  if (!memory.roomUsers.has(roomId)) {
    memory.roomUsers.set(roomId, new Set());
  }
  return memory.roomUsers.get(roomId);
};

const getRoomUsersPayload = (roomId) => [...roomSet(roomId)];

const bindSocket = (io, socket) => {
  socket.on('user_online', ({ user }) => {
    if (!user?.id) return;
    memory.onlineUsers.set(user.id, user);
    socket.data.user = user;
    io.emit('users_online', [...memory.onlineUsers.values()]);
  });

  socket.on('join_room', async ({ roomId, user }) => {
    if (!roomId || !user?.id) return;

    socket.join(roomId);
    roomSet(roomId).add(user.username);
    io.to(roomId).emit('room_users', { roomId, users: getRoomUsersPayload(roomId) });

    const systemMsg = {
      _id: cryptoId(),
      roomId,
      userId: user.id,
      username: user.username,
      content: `${user.username} joined the room`,
      type: 'system',
      createdAt: new Date().toISOString()
    };

    if (isMemoryStore()) {
      memory.messages.push(systemMsg);
      io.to(roomId).emit('receive_message', systemMsg);
      io.to(socket.id).emit('message_history', memory.messages.filter((msg) => msg.roomId === roomId).slice(-50));
      return;
    }

    await Message.create({
      roomId,
      userId: user.id,
      username: user.username,
      content: systemMsg.content,
      type: 'system'
    });
    const history = await Message.find({ roomId }).sort({ createdAt: -1 }).limit(50);
    io.to(socket.id).emit('message_history', history.reverse());
    io.to(roomId).emit('receive_message', systemMsg);
  });

  socket.on('leave_room', ({ roomId, user }) => {
    if (!roomId || !user?.id) return;
    socket.leave(roomId);
    roomSet(roomId).delete(user.username);
    io.to(roomId).emit('room_users', { roomId, users: getRoomUsersPayload(roomId) });
    io.to(roomId).emit('receive_message', {
      _id: cryptoId(),
      roomId,
      userId: user.id,
      username: user.username,
      content: `${user.username} left the room`,
      type: 'system',
      createdAt: new Date().toISOString()
    });
  });

  socket.on('typing_start', ({ roomId, username }) => {
    socket.to(roomId).emit('user_typing', { roomId, username, typing: true });
  });

  socket.on('typing_stop', ({ roomId, username }) => {
    socket.to(roomId).emit('user_typing', { roomId, username, typing: false });
  });

  socket.on('send_message', async ({ roomId, content, type = 'text', user }) => {
    if (!roomId || !content || !user?.id) return;

    const payload = {
      _id: cryptoId(),
      roomId,
      userId: user.id,
      username: user.username,
      content,
      type,
      createdAt: new Date().toISOString()
    };

    if (isMemoryStore()) {
      memory.messages.push(payload);
      io.to(roomId).emit('receive_message', payload);
      return;
    }

    const message = await Message.create({
      roomId,
      userId: user.id,
      username: user.username,
      content,
      type
    });

    io.to(roomId).emit('receive_message', {
      ...payload,
      _id: message._id
    });
  });

  socket.on('disconnect', () => {
    if (socket.data.user?.id) {
      memory.onlineUsers.delete(socket.data.user.id);
      io.emit('users_online', [...memory.onlineUsers.values()]);
    }
  });
};

module.exports = { bindSocket };
