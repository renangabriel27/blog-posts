import React, { useRef, useCallback } from 'react';
import { FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import { AnimationContainer } from '../../styles/form';

interface SignInFormData {
  id: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn } = useAuth();
  const { addToast } = useToasts();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          id: Yup.string().required('ID required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn(data.id);

        history.push('/posts/recent');
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
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Login</h1>

            <Input name="id" icon={FiUser} placeholder="your id" />

            <Button type="submit">Enter</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
