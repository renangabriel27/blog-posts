import React from 'react';

import Comment, { CommentProps } from '../Comment';

import { Container } from './styles';

const Comments: React.FC<any> = ({ comments }) => {
  return (
    <Container>
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
