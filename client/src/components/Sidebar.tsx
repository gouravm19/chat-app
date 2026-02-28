import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Room, logout, setActiveRoom } from '../app/store';
import { UserAvatar } from './UserAvatar';

export function Sidebar({ onCreateRoom }: { onCreateRoom: (name: string) => void }) {
  const dispatch = useDispatch();
  const { rooms, onlineUsers } = useSelector((s: RootState) => s.chat);
  const { user } = useSelector((s: RootState) => s.auth);
  const [name, setName] = useState('');

  return (
    <aside className="sidebar">
      <div className="header-row"><h2>Rooms</h2></div>
      <div className="rooms">{rooms.map((room: Room) => <button key={room._id} onClick={() => dispatch(setActiveRoom(room))}>{room.name}</button>)}</div>
      <div className="create-room">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Create room" />
        <button onClick={() => { if (name.trim()) onCreateRoom(name.trim()); setName(''); }}>+</button>
      </div>
      <h3>Online</h3>
      <div className="users">{onlineUsers.map((u) => <div key={u.id}><UserAvatar username={u.username} /> {u.username}</div>)}</div>
      {user && <div className="profile"><UserAvatar username={user.username} online /><span>{user.username}</span><button onClick={() => dispatch(logout())}>Logout</button></div>}
    </aside>
  );
}
