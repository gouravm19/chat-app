const express = require('express');
const auth = require('../middleware/auth');
const { getUsers, getRooms, createRoom, getMessages } = require('../controllers/chatController');

const router = express.Router();

router.get('/users', auth, getUsers);
router.get('/rooms', auth, getRooms);
router.post('/rooms', auth, createRoom);
router.get('/rooms/:id/messages', auth, getMessages);

module.exports = router;
