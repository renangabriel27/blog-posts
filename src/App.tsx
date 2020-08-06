import React from 'react';

import Home from './pages/Home';
import GlobalStyle from './styles/global';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Home />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
