import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import { Container } from '../../../styles/main';

const RecentPosts: React.FC = () => {
  const [recentPosts, setRecentPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const storageKey = `@Blog::${user.id}::posts`;

  useEffect(() => {
    const loadRecentPosts = async (): Promise<void> => {
      try {
        const posts = localStorage.getItem(storageKey);

        if (posts) {
          setRecentPosts(JSON.parse(posts));
          setLoading(false);
        }

        const response = await api.get('/posts');
        const { data } = response;
        const latestPosts = data.slice(0, 5);

        if (!posts) {
          localStorage.setItem(storageKey, JSON.stringify(latestPosts));
          setRecentPosts(latestPosts);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadRecentPosts();
  }, [storageKey]);

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
