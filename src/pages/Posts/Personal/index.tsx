import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';

import { POSTS_KEY } from '../../../contants/local-storage';

import { useAuth } from '../../../hooks/auth';
import { useLocalStorage } from '../../../hooks/storage';

import { Container } from '../../../styles/main';

const PersonalPosts: React.FC = () => {
  const { user } = useAuth();
  const [allPosts] = useLocalStorage(POSTS_KEY(), []);
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const loadMyPosts = async (): Promise<void> => {
      const onlyMyPosts = allPosts.filter((post: PostProps) => {
        return post.userId === user.id;
      });

      setMyPosts(onlyMyPosts);
    };

    loadMyPosts();
  }, [user, allPosts]);

  return (
    <Container>
      <Header>
        <h1>My Posts</h1>
      </Header>

      {myPosts.map((post: PostProps) => {
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

export default PersonalPosts;
