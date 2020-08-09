import React from 'react';

import { Container, Title, Email, Description } from './styles';

export interface CommentProps {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ name, email, body }) => {
  return (
    <Container>
      <Email>{email}</Email>
      <Title>{name}</Title>
      <Description>{body}</Description>
    </Container>
  );
};

export default Comment;
