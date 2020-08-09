import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';
import { useSwr } from '../../../hooks/swr';
import { useLocalStorage } from '../../../hooks/storage';
import { POSTS_KEY } from '../../../constants/local-storage';

import Posts from '../../../components/Posts';
import { Container } from '../../../styles/main';

const RecentPosts: React.FC = () => {
  const { user } = useAuth();
  const { location } = useHistory<any>();
  const { state } = location;

  const { data: posts } = useSwr<PostProps[]>('/posts');
  const [recentPosts, setRecentPosts] = useLocalStorage(POSTS_KEY(), []);

  useEffect(() => {
    const loadRecentPosts = async (): Promise<void> => {
      try {
        if (!posts) {
          return;
        }

        const latestPosts = posts.slice(0, 5);

        if (recentPosts.length === 0) {
          setRecentPosts(latestPosts);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (state && state.posts) {
      setRecentPosts(state.posts);
    }

    loadRecentPosts();
  }, [setRecentPosts, recentPosts, state, posts]);

  if (!posts) {
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

      <Posts posts={recentPosts} />
    </Container>
  );
};

export default RecentPosts;
