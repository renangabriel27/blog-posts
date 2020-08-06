import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { PostProps } from '../../../components/Post';
import api from '../../../services/api';

import { Container } from './styles';

interface CommentsProps {
  id: number;
  name: string;
  email: string;
  body: string;
}

const ShowPost: React.FC = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentsProps[]>([]);

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      const response = await api.get(`/posts/${id}`);
      setPost(response.data);
    };

    const loadComments = async (): Promise<void> => {
      const response = await api.get(`/posts/${id}/comments`);
      setComments(response.data);
    };

    loadPost();
    loadComments();
  }, [id]);

  return (
    <Container>
      <h1>Id {id}</h1>
      <p>Title {post.title}</p>
      <p>Body {post.body}</p>
      <p>UserId {post.userId}</p>

      {comments.map((comment: CommentsProps, index) => {
        return <p key={comment.id}>{comment.email}</p>;
      })}
    </Container>
  );
};

export default ShowPost;
