import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import { Container } from './styles';

const PersonalPosts: React.FC = () => {
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const loadMyPosts = async (): Promise<void> => {
      const response = await api.get(`/posts?userId=${user.id}`);
      const { data } = response;

      setMyPosts(data);
    };

    loadMyPosts();
  }, [user]);

  return (
    <Container>
      <Header>
        <h1>My Posts</h1>
      </Header>

      {myPosts.map((post) => {
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
