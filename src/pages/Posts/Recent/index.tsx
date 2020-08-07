import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import { Container } from './styles';

const RecentPosts: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<PostProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const loadRecentPosts = async (): Promise<void> => {
      const response = await api.get('/posts');
      const { data } = response;
      const latestPosts = data.slice(0, 3);

      setRecentPosts(latestPosts);
    };

    loadRecentPosts();
  }, []);

  return (
    <Container>
      <Header>
        <h1>Welcome {user.name}!</h1>
      </Header>

      {recentPosts.map((post) => {
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

export default RecentPosts;
