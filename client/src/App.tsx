import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';

function Protected({ children }: { children: JSX.Element }) {
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/register" element={<AuthPage mode="register" />} />
      <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
      <Route path="/chat/:roomId" element={<Protected><ChatPage /></Protected>} />
      <Route path="*" element={<Navigate to="/chat" replace />} />
    </Routes>
  );
}
