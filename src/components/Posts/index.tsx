import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Post, { PostProps } from '../Post';
import Button from '../Button';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

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
  const { user } = useAuth();
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
    };

    const loadMyPosts = async (): Promise<void> => {
      const response = await api.get(`/posts?userId=${user.id}`);
      const { data } = response;
      setMyPosts(data);
      setPosts(data);
    };

    loadAllPosts();
    loadMyPosts();
    setSelectedPosts({ allPosts: false, myPosts: true, createPost: false });
  }, [user.id]);

  return (
    <Container>
      <h1>Posts</h1>

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
        Create a post
      </Button>

      <Button
        type="button"
        onClick={showAllPosts}
        selected={selectedPosts.allPosts}
      >
        All posts
      </Button>

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
