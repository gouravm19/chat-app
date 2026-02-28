import { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Subject, debounceTime } from 'rxjs';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export function ChatWindow({ onSend, onTyping }: { onSend: (content: string, type?: string) => void; onTyping: (typing: boolean) => void }) {
  const { activeRoom, messages, typing } = useSelector((s: RootState) => s.chat);
  const { user } = useSelector((s: RootState) => s.auth);
  const roomMessages = useMemo(() => (activeRoom ? messages[activeRoom._id] || [] : []), [messages, activeRoom]);
  const [content, setContent] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const typingSubject = useRef(new Subject<string>());

  useEffect(() => {
    const sub = typingSubject.current.pipe(debounceTime(300)).subscribe(() => onTyping(false));
    return () => sub.unsubscribe();
  }, [onTyping]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [roomMessages]);

  const send = () => {
    if (!content.trim()) return;
    const isEmoji = /^\p{Extended_Pictographic}+$/u.test(content.trim());
    onSend(content.trim(), isEmoji ? 'emoji' : 'text');
    setContent('');
    onTyping(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
    else {
      onTyping(true);
      typingSubject.current.next(e.key);
    }
  };

  return (
    <section className="chat-window">
      <div className="messages">
        {roomMessages.map((m) => <div key={m._id} className={`bubble ${m.userId === user?.id ? 'own' : 'other'}`}><p>{m.content}</p><small>{new Date(m.createdAt).toLocaleTimeString()}</small></div>)}
        <div ref={endRef} />
      </div>
      {activeRoom && typing[activeRoom._id] && <div className="typing">{typing[activeRoom._id]} is typing <span className="dots"><i /><i /><i /></span></div>}
      <div className="composer">
        <button onClick={() => setContent((c) => `${c}😊`)}>😀</button>
        <input value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={onKeyDown} placeholder="Type message..." />
        <button onClick={send}>Send</button>
      </div>
    </section>
  );
}
