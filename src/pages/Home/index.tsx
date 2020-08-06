import React from 'react';

import Posts from '../../components/Posts';

import { useAuth } from '../../hooks/auth';

import { Container, Header } from './styles';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header>
        <h1>Welcome {user.name}!</h1>
      </Header>

      <Posts />
    </Container>
  );
};

export default Home;
