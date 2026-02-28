import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User { id: string; username: string; email: string }
export interface Room { _id: string; name: string }
export interface Message { _id: string; roomId: string; username: string; content: string; type: string; createdAt: string; userId: string }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token'),
    isAuthenticated: Boolean(localStorage.getItem('token'))
  },
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.clear();
    }
  }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    rooms: [] as Room[],
    activeRoom: null as Room | null,
    messages: {} as Record<string, Message[]>,
    onlineUsers: [] as User[],
    typing: {} as Record<string, string>
  },
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => { state.rooms = action.payload; },
    setActiveRoom: (state, action: PayloadAction<Room | null>) => { state.activeRoom = action.payload; },
    setMessages: (state, action: PayloadAction<{ roomId: string; messages: Message[] }>) => {
      state.messages[action.payload.roomId] = action.payload.messages;
    },
    pushMessage: (state, action: PayloadAction<Message>) => {
      const room = action.payload.roomId;
      if (!state.messages[room]) state.messages[room] = [];
      state.messages[room].push(action.payload);
    },
    setOnlineUsers: (state, action: PayloadAction<User[]>) => { state.onlineUsers = action.payload; },
    setTyping: (state, action: PayloadAction<{ roomId: string; username: string; typing: boolean }>) => {
      if (action.payload.typing) state.typing[action.payload.roomId] = action.payload.username;
      else delete state.typing[action.payload.roomId];
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export const { setRooms, setActiveRoom, setMessages, pushMessage, setOnlineUsers, setTyping } = chatSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
