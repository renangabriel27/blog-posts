import React from 'react';

import { Container, Title, Description } from './styles';

export interface CommentProps {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

const Comment: React.FC<CommentProps> = ({ id, name, email, body, postId }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <Description>{body}</Description>
    </Container>
  );
};

export default Comment;
