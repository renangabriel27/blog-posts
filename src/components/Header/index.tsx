import React from 'react';

import Menu from '../Menu';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  return (
    <Container>
      {children}
      <Menu />
    </Container>
  );
};

export default Header;
