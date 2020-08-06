import React from 'react';

import { useHistory } from 'react-router-dom';
import { Container, Title, Description } from './styles';

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Post: React.FC<PostProps> = ({ id, title, body, userId }) => {
  const history = useHistory();

  return (
    <Container onClick={() => history.push(`posts/${id}`)}>
      <Title>{title}</Title>
      <Description>{body}</Description>
    </Container>
  );
};

export default Post;
