import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../../hooks/auth';
import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

import api from '../../../services/api';

import { Container, Content, AnimationContainer } from './styles';

interface PostFormData {
  userId: number;
  title: string;
  body: string;
}

const CreatePost: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToasts();
  const { user } = useAuth();

  const addNewPost = useCallback((newPost) => {
    const personalPosts = localStorage.getItem('@Blog::posts');

    if (personalPosts) {
      const parsedData = JSON.parse(personalPosts);
      const newPersonalPosts = [newPost, ...parsedData];

      localStorage.setItem('@Blog::posts', JSON.stringify(newPersonalPosts));
    } else {
      localStorage.setItem('@Blog::posts', JSON.stringify([newPost]));
    }
  }, []);

  const handleSubmit = useCallback(
    async (data: PostFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Title required'),
          body: Yup.string().required('Body required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const post = {
          id: uuidv4(),
          title: data.title,
          body: data.body,
          userId: user.id,
        };

        addNewPost(post);

        addToast('Created with success', {
          appearance: 'success',
          autoDismiss: true,
        });

        api.post('/posts', post);

        history.push('/posts/personal');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast('Creation Error', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    },
    [addToast, history, user, addNewPost],
  );

  return (
    <Container>
      <Header>
        <h1>Write a post</h1>
      </Header>

      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="title" placeholder="Title" />
            <Input name="body" placeholder="Body" />

            <Button type="submit">Create</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreatePost;
