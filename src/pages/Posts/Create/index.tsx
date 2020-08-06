import React, { useRef, useCallback } from 'react';

import { FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../../hooks/auth';
import getValidationErrors from '../../../utils/getValidationErrors';

import Input from '../../../components/Input';
import Button from '../../../components/Button';

import api from '../../../services/api';

import { Container, Content, AnimationContainer } from '../../SignIn/styles';

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

        const response = await api.post('/posts', {
          title: data.title,
          body: data.body,
          userId: user.id,
        });

        console.log('response', response.data);

        addToast('Created with success', {
          appearance: 'success',
          autoDismiss: true,
        });

        history.push('/home');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast('Authentication Error', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    },
    [addToast, history, user],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Input name="title" icon={FiUser} placeholder="Title" />
            <Input name="body" icon={FiUser} placeholder="Body" />

            <Button type="submit">Create</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default CreatePost;
