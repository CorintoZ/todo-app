import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { TaskProvider } from './context/TaskContext';
import { useAuth } from './context/useAuth.tsx';
import LoginPage from './pages/LoginPage/LoginPage';
import TaskPage from './pages/TaskPage/TaskPage';
import React from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuth();
  return token ?  children : <Navigate to="/login" />;
}

function App() {
  const { token } = useAuth();

  return (
    <TaskProvider>
      <Routes>
        <Route path="/login" element={token ? <Navigate to={'/tasks' } /> : <LoginPage /> } />
        <Route path="/tasks" element={<ProtectedRoute><TaskPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to={token ? '/tasks' : '/login'} />} />
      </Routes>
    </TaskProvider>
  )
}

export default App
