import React from 'react';

import { Container, Title, Description } from './styles';

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Post: React.FC<PostProps> = ({ id, title, body, userId }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Description>{body}</Description>
    </Container>
  );
};

export default Post;
