import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import Button from '../Button';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Menu: React.FC = () => {
  const { signOut } = useAuth();

  const history = useHistory();

  const isActive = useCallback((path) => {
    const relativePath = window.location.href.replace(
      window.location.origin,
      '',
    );

    return relativePath === path;
  }, []);

  return (
    <Container>
      <Button
        type="button"
        selected={isActive('/posts/recent')}
        onClick={() => history.push('/posts/recent')}
      >
        Recent posts
      </Button>

      <Button
        type="button"
        selected={isActive('/posts/personal')}
        onClick={() => history.push('/posts/personal')}
      >
        My posts
      </Button>

      <Button
        type="button"
        selected={isActive('/posts/new')}
        onClick={() => history.push('/posts/new')}
      >
        Write a post
      </Button>

      <Button type="button" onClick={signOut}>
        Logout
      </Button>
    </Container>
  );
};

export default Menu;
