const mongoose = require('mongoose');

let useMemoryStore = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MONGO_URI not provided. Falling back to in-memory mock mode.');
    useMemoryStore = true;
    return null;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
    return mongoose.connection;
  } catch (error) {
    console.warn('MongoDB connection failed. Using in-memory mock mode.', error.message);
    useMemoryStore = true;
    return null;
  }
};

const isMemoryStore = () => useMemoryStore;

module.exports = { connectDB, isMemoryStore };
