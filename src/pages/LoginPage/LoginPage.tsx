import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useAuth } from '../../context/useAuth';

type LoginPageProps = {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { login, loading } = useAuth();

  const handleLogin = async () => {
    try {
      setError(null);
      await login(username, password);
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <label>
        Username
        <input className={styles.input} type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password
        <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default LoginPage;
