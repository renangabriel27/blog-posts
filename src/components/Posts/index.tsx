import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Post, { PostProps } from '../Post';
import Button from '../Button';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Menu } from './styles';

interface SelectedPostsProps {
  allPosts: boolean;
  myPosts: boolean;
  createPost: boolean;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [allPosts, setAllPosts] = useState<PostProps[]>([]);
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<SelectedPostsProps>(
    {} as SelectedPostsProps,
  );
  const { user, signOut } = useAuth();
  const history = useHistory();

  function showAllPosts(): void {
    setPosts(allPosts.slice(0, 3));
    setSelectedPosts({ allPosts: true, myPosts: false, createPost: false });
  }

  function showMyPosts(): void {
    setPosts(myPosts);
    setSelectedPosts({ allPosts: false, myPosts: true, createPost: false });
  }

  useEffect(() => {
    const loadAllPosts = async (): Promise<void> => {
      const response = await api.get('/posts');
      const { data } = response;
      const recentPosts = data.slice(0, 3);

      setAllPosts(recentPosts);
      setPosts(recentPosts);
    };

    const loadMyPosts = async (): Promise<void> => {
      const response = await api.get(`/posts?userId=${user.id}`);
      const { data } = response;
      setMyPosts(data);
    };

    loadAllPosts();
    loadMyPosts();
    setSelectedPosts({ allPosts: true, myPosts: false, createPost: false });
  }, [user.id]);

  return (
    <Container>
      <Menu>
        <Button
          type="button"
          onClick={showAllPosts}
          selected={selectedPosts.allPosts}
        >
          Recent posts
        </Button>

        <Button
          type="button"
          onClick={showMyPosts}
          selected={selectedPosts.myPosts}
        >
          My posts
        </Button>

        <Button
          type="button"
          selected={selectedPosts.createPost}
          onClick={() => history.push('/posts/new')}
        >
          Write a post
        </Button>

        <Button type="button" onClick={signOut}>
          Logout
        </Button>
      </Menu>

      {posts.map((post) => {
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

export default Posts;
