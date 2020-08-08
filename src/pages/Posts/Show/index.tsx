import React, { useState, useEffect, useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/storage';
import { useSwr } from '../../../hooks/swr';
import { POSTS_KEY } from '../../../contants/local-storage';

import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Textarea from '../../../components/Textarea';
import Button from '../../../components/Button';
import Comments from '../../../components/Comments';
import { CommentProps } from '../../../components/Comment';
import { PostProps } from '../../../components/Post';
import Posts from '../../../components/Posts';

import { Container } from '../../../styles/main';

const ShowPost: React.FC = () => {
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const [showForm, setShowForm] = useState(false);
  const [allPosts] = useLocalStorage(POSTS_KEY(), []);

  const { data: postsData, error: postsError } = useSwr<PostProps>(
    `/posts/${id}`,
  );
  const { data: commentsData } = useSwr<CommentProps[]>(
    `/posts/${id}/comments`,
  );

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    if (postsData) {
      setPost(postsData);
    }

    if (postsError && allPosts) {
      const showPost = allPosts.find((item: PostProps) => {
        return item.id === id;
      });

      setPost(showPost);
    }

    if (commentsData) {
      setComments(commentsData);
    }
  }, [id, postsData, postsError, allPosts, commentsData]);

  const handleSubmit = useCallback(() => {
    console.log('handled');
  }, []);

  if (!post || !commentsData) {
    return (
      <Container>
        <Header>
          <h1>Post</h1>
        </Header>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Post</h1>
      </Header>

      <Posts posts={[post]} showOptions={false} />

      <Button type="submit" onClick={() => setShowForm(!showForm)}>
        Add comment
      </Button>

      {showForm && (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Title" />
          <Textarea name="body" placeholder="Body" />

          <Button type="submit">Comment</Button>
        </Form>
      )}

      <Comments comments={comments} />
    </Container>
  );
};

export default ShowPost;
