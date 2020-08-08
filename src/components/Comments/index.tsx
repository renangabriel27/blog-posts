import React from 'react';

import Comment, { CommentProps } from '../Comment';

import { Container, Title } from './styles';

const Comments: React.FC<any> = ({ comments }) => {
  return (
    <Container>
      {comments.length > 0 && <Title>Comments - {comments.length}</Title>}

      {comments.map((comment: CommentProps) => {
        return (
          <Comment
            key={comment.id}
            body={comment.body}
            email={comment.email}
            id={comment.id}
            name={comment.name}
            postId={comment.postId}
          />
        );
      })}
    </Container>
  );
};

export default Comments;
