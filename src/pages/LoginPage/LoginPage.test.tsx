import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/useAuth';
import LoginPage from './LoginPage';
const useAuthMock = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  useAuth: useAuthMock,
  useNavigate: () => vi.fn(),
}));

describe('LoginPage', () => {
  test('renders login form correctly', () => {
    render(
  <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('disables login button during loading', async() => {
    useAuthMock.mockReturnValue({
      login: vi.fn().mockResolvedValue(undefined),
      loading: true,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled();
  });

});
