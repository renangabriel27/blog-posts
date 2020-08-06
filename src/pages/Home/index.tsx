import React from 'react';

import Posts from '../../components/Posts';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Home: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <p>Welcome {user.name}!</p>

      <Button type="button" onClick={signOut}>
        Logout
      </Button>

      <Posts />
    </Container>
  );
};

export default Home;
