import React, { useState, useEffect } from 'react';

import { useParams, useHistory } from 'react-router-dom';

import Button from '../../../components/Button';
import Comment, { CommentProps } from '../../../components/Comment';
import Post, { PostProps } from '../../../components/Post';
import api from '../../../services/api';

import { Container } from './styles';

const ShowPost: React.FC = () => {
  const { id } = useParams();
  const history = useHistory();

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

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
      <h1>Post</h1>

      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        userId={post.userId}
      />

      <h2>Comments</h2>

      {comments.map((comment: CommentProps) => {
        return (
          <Comment
            body={comment.body}
            email={comment.email}
            id={comment.id}
            name={comment.name}
            postId={comment.postId}
          />
        );
      })}
    </Container>
  );
};

export default ShowPost;
