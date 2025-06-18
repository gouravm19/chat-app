# 💬 Real-Time Chat Application

A real-time chat web application built with **React**, **Node.js**, **Socket.IO**, and **MongoDB**, supporting 5000+ users, secure messaging, and high uptime.

## 🚀 Features
- Real-time chat with WebSockets (Socket.IO)
- Secure user authentication (JWT)
- Online/offline presence tracking
- End-to-end encrypted messaging
- Notifications using Firebase
- Responsive UI with React

## 🛠️ Tech Stack
- **Frontend:** React, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSocket:** Socket.IO
- **Auth:** JWT
- **Notifications:** Firebase Cloud Messaging

## 📦 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/gouravm19/chat-app.git
cd chat-app
```

### 2️⃣ Setup Backend
```bash
cd server
npm install
cp .env.example .env
npm start
```

### 3️⃣ Setup Frontend
```bash
cd client
npm install
npm start
```

The app runs at: [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables (`.env.example`)
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_SERVER_KEY=your_firebase_key
```

## 📸 Screenshots
![Chat UI](./screenshots/chat-ui.png)

## 👨‍💻 Author
[Gourav Mishra](https://www.linkedin.com/in/gourav-mishra-ba53761a1/)
