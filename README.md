# 💬 Real-Time Chat Application (React + Node.js)

![CI](https://github.com/gouravm19/chat-app/actions/workflows/ci.yml/badge.svg)
![Node 20](https://img.shields.io/badge/node-20.x-339933)
![React](https://img.shields.io/badge/frontend-React%2018-61DAFB)
![Socket.io](https://img.shields.io/badge/realtime-Socket.io-010101)

A full-stack real-time chat app with JWT auth, Socket.io messaging, room-based chat, typing indicators, and Docker setup.

**Built by Gourav Mishra — Senior Full Stack Developer**  
GitHub: [@gouravm19](https://github.com/gouravm19)  
Portfolio: [gouravmishra.is-a.dev](https://gouravmishra.is-a.dev)

## Stack
- Frontend: React + TypeScript + Redux Toolkit + RxJS + CSS (dark WhatsApp-like layout)
- Backend: Node.js 20 + Express + Socket.io + Mongoose + JWT
- Database: MongoDB Atlas (with in-memory fallback if DB unavailable)
- DevOps: Docker, docker-compose, GitHub Actions CI

## Features
- Auth routes: register/login with JWT
- Online users tracking
- Room list + create room
- Room message history (last 50)
- Real-time events for join/leave/send/typing
- Message types: `text`, `emoji`, `system`
- Mobile responsive layout (<768px)

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users`
- `GET /api/rooms`
- `POST /api/rooms`
- `GET /api/rooms/:id/messages`

## Socket.io Events
| Client → Server | Payload |
|---|---|
| `join_room` | `{ roomId, user }` |
| `leave_room` | `{ roomId, user }` |
| `send_message` | `{ roomId, content, type, user }` |
| `typing_start` | `{ roomId, username }` |
| `typing_stop` | `{ roomId, username }` |
| `user_online` | `{ user }` |

| Server → Client | Payload |
|---|---|
| `receive_message` | `{ user, content, timestamp, roomId }` |
| `user_typing` | `{ username, typing, roomId }` |
| `users_online` | `User[]` |
| `room_users` | `{ roomId, users }` |
| `message_history` | `Message[]` |

## Quick Start (Local)
```bash
# backend
cd server
npm install
cp ../.env.example .env
npm run dev

# frontend (new terminal)
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

### Demo login
- Email: `gourav@test.com`
- Password: `Test@123`

## Docker
```bash
docker compose up --build
```

## Deploy to GitHub (step-by-step)
```bash
git init
git add .
git commit -m "feat: full-stack realtime chat app"
git branch -M main
git remote add origin https://github.com/gouravm19/chat-app.git
git push -u origin main
```

## Deploy frontend to Netlify
1. Push this repo to GitHub.
2. In Netlify: **Add new project** → Import from GitHub.
3. Set base dir = `client`, build command = `npm run build`, publish dir = `dist`.
4. Environment variable: `VITE_API_URL=<your-backend-url>`.
5. Deploy and copy live URL.

## After deployment checklist
- Add GitHub + Netlify links in your portfolio project card.
- Pin `chat-app` repository on GitHub profile.
- Keep CI badge green for credibility.

## Project Structure
```
chat-app/
  client/   # React app
  server/   # Express + Socket.io API
  .github/workflows/ci.yml
  docker-compose.yml
```
