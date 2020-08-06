import React from 'react';

import Posts from '../../components/Posts';

import { useAuth } from '../../hooks/auth';

import { Container, Header } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header>
        <p>Welcome {user.name}!</p>
      </Header>

      <Posts />
    </Container>
  );
};

export default Home;
