import React, { useEffect, useCallback } from 'react';

import Post, { PostProps } from '../Post';
import { USERS_KEY } from '../../contants/local-storage';

import { useSwr } from '../../hooks/swr';
import { useLocalStorage } from '../../hooks/storage';

const Posts: React.FC<any> = ({ posts }) => {
  const [users, setUsers] = useLocalStorage(USERS_KEY, []);
  const { data: usersData } = useSwr<PostProps[]>('/users');

  useEffect(() => {
    if (users.length === 0 && usersData) {
      setUsers(usersData);
    }
  }, [setUsers, users, usersData]);

  const selectUser = useCallback(
    (userId) => {
      return users.find((user: { id: number }) => user.id === userId);
    },
    [users],
  );

  if (!users) {
    return null;
  }

  return posts.map((post: PostProps) => {
    return (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        userId={post.userId}
        creator={selectUser(post.userId)}
      />
    );
  });
};

export default Posts;
