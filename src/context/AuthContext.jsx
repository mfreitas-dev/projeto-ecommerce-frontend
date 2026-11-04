import { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (username, password) => {
    const data = await api('/auth/login', {
      method: 'POST',
      body: { username, password },
    });
    localStorage.setItem('token', data.auth);
    setToken(data.auth);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}