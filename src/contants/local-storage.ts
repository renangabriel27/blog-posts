import React from 'react';
import { AuthContext } from '../hooks/auth';

const KEY_PREFIX = '@Blog';
export const USERS_KEY = `${KEY_PREFIX}::users`;
export const COMMENTS_KEY = `${KEY_PREFIX}::comments`;

export const POSTS_KEY = () => {
  const { user } = React.useContext(AuthContext);

  return `${KEY_PREFIX}::${user.id}::posts`;
};
