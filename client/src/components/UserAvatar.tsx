import './UserAvatar.css';

export function UserAvatar({ username, online = true }: { username: string; online?: boolean }) {
  const initials = username.slice(0, 2).toUpperCase();
  const hue = Array.from(username).reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <div className="avatar-wrap">
      <div className="avatar" style={{ backgroundColor: `hsl(${hue}deg 80% 45%)` }}>{initials}</div>
      <span className={`status ${online ? 'online' : 'offline'}`} />
    </div>
  );
}
