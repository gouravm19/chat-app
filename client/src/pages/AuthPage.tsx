import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { http } from '../api/http';
import { setAuth } from '../app/store';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const { data } = await http.post(path, form);
    dispatch(setAuth(data));
    navigate('/chat');
  };

  return (
    <main className="auth">
      <h1>{mode === 'login' ? 'Login' : 'Register'}</h1>
      {mode === 'register' && <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />}
      <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Continue</button>
      <Link to={mode === 'login' ? '/auth/register' : '/auth/login'}>{mode === 'login' ? 'Need account?' : 'Already have account?'}</Link>
    </main>
  );
}
