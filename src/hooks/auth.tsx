import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface UserProps {
  id: number;
  name: string;
  email?: string;
}

interface AuthState {
  user: UserProps;
}

interface AuthContextData {
  user: UserProps;
  signIn(id: string): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@Blog::user');

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async (identification) => {
    const response = await api.get(`/users/${identification}`);

    const { id, name } = response.data;

    const user = { id, name };

    localStorage.setItem('@Blog::user', JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Blog::user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, AuthContext, useAuth };
