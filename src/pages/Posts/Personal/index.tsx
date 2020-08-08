import React, { useEffect, useState } from 'react';

import Header from '../../../components/Header';
import Post, { PostProps } from '../../../components/Post';

import { useAuth } from '../../../hooks/auth';

import { Container } from './styles';

const PersonalPosts: React.FC = () => {
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);

  const { user } = useAuth();
  const storageKey = `@Blog::${user.id}::posts`;

  useEffect(() => {
    const loadMyPosts = async (): Promise<void> => {
      const allPosts = localStorage.getItem(storageKey);
      const parsedPosts = JSON.parse(allPosts || '');
      const onlyMyPosts = parsedPosts.filter((parsedData: PostProps) => {
        return parsedData.userId === user.id;
      });
      setMyPosts(onlyMyPosts);
    };

    loadMyPosts();
  }, [user, storageKey]);

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
