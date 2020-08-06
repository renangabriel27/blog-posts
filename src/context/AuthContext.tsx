import React, { createContext, useCallback, useState } from 'react';

import api from '../services/api';

interface AuthState {
  user: object;
}

interface AuthContextData {
  user: object;
  signIn(id: string): Promise<void>;
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

  const signIn = useCallback(async ({ identification }) => {
    const response = await api.get(`/users/${identification}`);

    const { id, name } = response.data;
    const user = { id, name };

    localStorage.setItem('@Blog::user', JSON.stringify(user));

    setData({ user });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
