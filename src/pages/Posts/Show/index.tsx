import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import Header from '../../../components/Header';
import Comment, { CommentProps } from '../../../components/Comment';
import Post, { PostProps } from '../../../components/Post';
import api from '../../../services/api';

import { Container } from './styles';

const ShowPost: React.FC = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      const response = await api.get(`/posts/${id}`);
      console.log('response', response.data);
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
      <Header>
        <h1>Post</h1>
      </Header>

      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        userId={post.userId}
      />

      <h2>Comments - {comments.length}</h2>

      {comments.map((comment: CommentProps) => {
        return (
          <Comment
            key={comment.id}
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
