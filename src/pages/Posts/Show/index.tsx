import React, { useState, useEffect, useCallback, useRef } from 'react';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../../hooks/auth';

import { useLocalStorage } from '../../../hooks/storage';
import { useSwr } from '../../../hooks/swr';
import { POSTS_KEY, COMMENTS_KEY } from '../../../contants/local-storage';

import getValidationErrors from '../../../utils/getValidationErrors';

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
  const { addToast } = useToasts();
  const { user } = useAuth();

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
  const [comments, setComments] = useLocalStorage(COMMENTS_KEY, []);

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
  }, [id, postsData, postsError, allPosts]);

  const selectMyComments = useCallback(
    (myComments) => {
      return myComments.filter((myComment: CommentProps) => {
        return myComment.postId === id;
      });
    },
    [id],
  );

  const addNewComment = useCallback(
    (newComment) => {
      if (comments.length > 0) {
        setComments([newComment, ...comments]);
      } else {
        setComments([newComment]);
      }
    },
    [comments, setComments],
  );

  const handleAddComment = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          body: Yup.string().required('Content required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const comment = {
          id: uuidv4(),
          postId: id,
          name: data.name,
          body: data.body,
          email: user.email,
        };

        addNewComment(comment);

        addToast('Comment added with success!', {
          appearance: 'success',
          autoDismiss: true,
        });

        setShowForm(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast('Error on comment', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    },
    [addToast, id, addNewComment, user],
  );

  if (!post || !comments || !commentsData) {
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

      <Posts key={id} posts={[post]} showOptions={false} />

      <Button type="submit" onClick={() => setShowForm(!showForm)}>
        Add comment
      </Button>

      {showForm && (
        <Form ref={formRef} onSubmit={handleAddComment}>
          <Input name="name" placeholder="Name" />
          <Textarea name="body" placeholder="Content" />

          <Button type="submit">Comment</Button>
        </Form>
      )}

      <Comments comments={[...selectMyComments(comments), ...commentsData]} />
    </Container>
  );
};

export default ShowPost;
