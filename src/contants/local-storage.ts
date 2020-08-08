import React from 'react';
import { AuthContext } from '../hooks/auth';

const KEY_PREFIX = '@Blog';

export const POSTS_KEY = () => {
  const { user } = React.useContext(AuthContext);

  return `${KEY_PREFIX}::${user.id}::posts`;
};
