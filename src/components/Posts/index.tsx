import React, { useEffect, useCallback, useState } from 'react';

import Post from '../Post';

import api from '../../services/api';

import { Container } from './styles';

interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      const response = await api.get('/posts');
      console.log('response', response.data);
      setPosts(response.data);
    };

    loadPosts();
  }, []);

  const recentPosts = useCallback(() => {
    return posts.slice(0, 3);
  }, [posts]);

  return (
    <Container>
      <h1>Posts</h1>

      {recentPosts().map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            userId={post.userId}
          />
        );
      })}
    </Container>
  );
};

export default Posts;
