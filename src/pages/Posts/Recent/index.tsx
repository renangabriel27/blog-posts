import React, { useEffect } from 'react';

import Header from '../../../components/Header';
import { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';
import { useSwr } from '../../../hooks/swr';
import { useLocalStorage } from '../../../hooks/storage';
import { POSTS_KEY } from '../../../constants/local-storage';

import Posts from '../../../components/Posts';
import PostsLoading from '../../../components/PostsLoading';
import { Container } from '../../../styles/main';

const RecentPosts: React.FC = () => {
  const { user } = useAuth();

  const { data: posts } = useSwr<PostProps[]>('/posts');
  const [recentPosts, setRecentPosts] = useLocalStorage(POSTS_KEY(), []);

  useEffect(() => {
    const loadRecentPosts = async (): Promise<void> => {
      if (!posts) {
        return;
      }

      const latestPosts = posts.slice(0, 5);

      if (recentPosts.length === 0) {
        setRecentPosts(latestPosts);
      }
    };

    loadRecentPosts();
  }, [setRecentPosts, recentPosts, posts]);

  if (!posts) {
    return (
      <Container>
        <Header>
          <h1>Welcome {user.name}!</h1>
        </Header>

        <PostsLoading />
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
