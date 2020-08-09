import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import { PostProps } from '../../../components/Post';
import { POSTS_KEY } from '../../../constants/local-storage';

import { useAuth } from '../../../hooks/auth';
import { useLocalStorage } from '../../../hooks/storage';

import Posts from '../../../components/Posts';
import { Container } from '../../../styles/main';

const PersonalPosts: React.FC = () => {
  const { user } = useAuth();
  const [allPosts, setAllPosts] = useLocalStorage(POSTS_KEY(), []);
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);

  const { location } = useHistory<any>();
  const { state } = location;

  useEffect(() => {
    const loadMyPosts = async (): Promise<void> => {
      const onlyMyPosts = allPosts.filter((post: PostProps) => {
        return post.userId === user.id;
      });

      setMyPosts(onlyMyPosts);
    };

    if (state && state.posts) {
      setAllPosts(state.posts);
    }

    loadMyPosts();
  }, [user, allPosts, setAllPosts, state]);

  return (
    <Container>
      <Header>
        <h1>My Posts</h1>
      </Header>

      <Posts posts={myPosts} />
    </Container>
  );
};

export default PersonalPosts;
