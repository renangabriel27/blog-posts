import React, { createContext, useCallback, useState, useContext } from 'react';

import { USER_KEY } from '../constants/local-storage';

import api from '../services/api';

interface UserProps {
  id: number;
  name: string;
  email: string;
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
    const user = localStorage.getItem(USER_KEY);

    if (user) {
      return { user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async (identification) => {
    const response = await api.get(`/users/${identification}`);

    const { id, name, email } = response.data;

    const user = { id, name, email };

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    setData({ user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(USER_KEY);

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
