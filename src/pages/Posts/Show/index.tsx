import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/storage';
import { POSTS_KEY } from '../../../contants/local-storage';

import Header from '../../../components/Header';
import Comment, { CommentProps } from '../../../components/Comment';
import Post, { PostProps } from '../../../components/Post';
import api from '../../../services/api';

import { Container } from '../../../styles/main';

const ShowPost: React.FC = () => {
  const { id } = useParams();
  const [allPosts] = useLocalStorage(POSTS_KEY(), []);

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    const loadPost = async (): Promise<void> => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        const { status } = err.response;

        if (status === 404) {
          if (allPosts) {
            const showPost = allPosts.find((item: PostProps) => {
              return item.id === id;
            });
            setPost(showPost);
          }
        }
      }
    };

    const loadComments = async (): Promise<void> => {
      const response = await api.get(`/posts/${id}/comments`);
      setComments(response.data);
    };

    loadPost();
    loadComments();
  }, [id, allPosts]);

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
