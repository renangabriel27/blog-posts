import React, { useEffect, useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../../hooks/auth';
import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Header from '../../../components/Header';
import { PostProps } from '../../../components/Post';

import { Container, Content } from '../../../styles/main';
import { AnimationContainer } from '../../../styles/form';

interface PostFormData {
  userId: number;
  title: string;
  body: string;
}

interface LocationState {
  post: PostProps;
}

const EditPost: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const params = useParams<{ id: string }>();

  const { state } = useLocation<LocationState>();

  const { addToast } = useToasts();
  const { user } = useAuth();
  const storageKey = `@Blog::${user.id}::posts`;

  const [initialData, setInitialData] = useState({ title: '', body: '' });

  useEffect(() => {
    if (state.post) {
      const { post } = state;
      setInitialData({ title: post.title, body: post.body });
    }
  }, [state]);

  const editPost = useCallback(
    (newPost) => {
      const posts = localStorage.getItem(storageKey);

      if (posts) {
        const updatedData = JSON.parse(posts).filter((data: PostProps) => {
          return data.id.toString() !== params.id;
        });

        const newPosts = [newPost, ...updatedData];

        localStorage.removeItem(storageKey);
        localStorage.setItem(storageKey, JSON.stringify(newPosts));
      } else {
        localStorage.setItem(storageKey, JSON.stringify([newPost]));
      }
    },
    [storageKey, params],
  );

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

        editPost(post);

        addToast('Updated with success!', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/posts/personal');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast('Error on update', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    },
    [addToast, history, user, editPost],
  );

  return (
    <Container>
      <Header>
        <h1>Edit post</h1>
      </Header>

      <Content>
        <AnimationContainer>
          <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
            <Input name="title" placeholder="Title" />
            <Input name="body" placeholder="Body" />

            <Button type="submit">Update</Button>
            <Button onClick={() => history.goBack()}>Back</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default EditPost;
