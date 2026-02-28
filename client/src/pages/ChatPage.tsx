import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket, socketEvent$ } from '../api/socket';
import { http } from '../api/http';
import { ChatWindow } from '../components/ChatWindow';
import { Sidebar } from '../components/Sidebar';
import { AppDispatch, RootState, pushMessage, setActiveRoom, setMessages, setOnlineUsers, setRooms, setTyping } from '../app/store';

export function ChatPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((s: RootState) => s.auth);
  const { activeRoom } = useSelector((s: RootState) => s.chat);

  useEffect(() => {
    const init = async () => {
      const [roomsRes] = await Promise.all([http.get('/api/rooms')]);
      dispatch(setRooms(roomsRes.data));
      if (roomsRes.data.length) dispatch(setActiveRoom(roomsRes.data[0]));
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    if (!user) return;
    socket.connect();
    socket.emit('user_online', { user });

    const subs = [
      socketEvent$('receive_message').subscribe((m) => dispatch(pushMessage(m as never))),
      socketEvent$('users_online').subscribe((u) => dispatch(setOnlineUsers(u as never))),
      socketEvent$('user_typing').subscribe((t) => dispatch(setTyping(t as never))),
      socketEvent$('message_history').subscribe((msgs: any) => {
        if (activeRoom) dispatch(setMessages({ roomId: activeRoom._id, messages: msgs }));
      })
    ];

    return () => {
      subs.forEach((s) => s.unsubscribe());
      socket.disconnect();
    };
  }, [dispatch, user, activeRoom]);

  useEffect(() => {
    if (!activeRoom || !user) return;
    socket.emit('join_room', { roomId: activeRoom._id, user });
    http.get(`/api/rooms/${activeRoom._id}/messages`).then(({ data }) => {
      dispatch(setMessages({ roomId: activeRoom._id, messages: data }));
    });
    return () => socket.emit('leave_room', { roomId: activeRoom._id, user });
  }, [activeRoom, dispatch, user]);

  const createRoom = async (name: string) => {
    const { data } = await http.post('/api/rooms', { name });
    const { data: rooms } = await http.get('/api/rooms');
    dispatch(setRooms(rooms));
    dispatch(setActiveRoom(data));
  };

  const send = (content: string, type?: string) => {
    if (!activeRoom || !user) return;
    socket.emit('send_message', { roomId: activeRoom._id, content, type, user });
  };

  const typing = (isTyping: boolean) => {
    if (!activeRoom || !user) return;
    socket.emit(isTyping ? 'typing_start' : 'typing_stop', { roomId: activeRoom._id, username: user.username });
  };

  return (
    <main className="layout">
      <Sidebar onCreateRoom={createRoom} />
      <ChatWindow onSend={send} onTyping={typing} />
    </main>
  );
}
