import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';
import { useLocalStorage } from '../../../hooks/storage';
import { POSTS_KEY } from '../../../contants/local-storage';

import api from '../../../services/api';

import { Container } from '../../../styles/main';

const RecentPosts: React.FC = () => {
  const { user } = useAuth();
  const [recentPosts, setRecentPosts] = useLocalStorage(POSTS_KEY(), []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecentPosts = async (): Promise<void> => {
      try {
        const response = await api.get('/posts');
        const { data } = response;
        const latestPosts = data.slice(0, 5);

        if (recentPosts.length === 0) {
          setRecentPosts(latestPosts);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadRecentPosts();
  }, [setRecentPosts, recentPosts]);

  if (loading) {
    return (
      <Container>
        <Header>
          <h1>Welcome {user.name}!</h1>
        </Header>

        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Welcome {user.name}!</h1>
      </Header>

      {recentPosts.map((post: PostProps) => {
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
