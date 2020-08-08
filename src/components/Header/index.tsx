import React from 'react';

import Menu from '../Menu';

const Header: React.FC = ({ children }) => {
  return (
    <div>
      {children}
      <Menu />
    </div>
  );
};

export default Header;
