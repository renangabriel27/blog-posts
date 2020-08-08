import React, { useEffect } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';
import { useAuth } from '../../../hooks/auth';
import { useSwr } from '../../../hooks/swr';
import { useLocalStorage } from '../../../hooks/storage';
import { POSTS_KEY } from '../../../contants/local-storage';

import { Container } from '../../../styles/main';

const RecentPosts: React.FC = () => {
  const { user } = useAuth();
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

    loadRecentPosts();
  }, [setRecentPosts, recentPosts, posts]);

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
