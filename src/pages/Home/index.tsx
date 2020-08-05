import React from 'react';

import Posts from '../../components/Posts';

import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Posts />
    </Container>
  );
};

export default Home;
