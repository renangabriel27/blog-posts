import React, { useCallback } from 'react';
import { FiEdit, FiEye } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  Edit,
  Show,
  Buttons,
  Description,
  Creator,
} from './styles';

interface UserProps {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
}

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  creator?: UserProps;
  showOptions?: boolean;
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  body,
  userId,
  creator = {} as UserProps,
  showOptions = true,
}) => {
  const { user } = useAuth();

  const canEdit = useCallback(() => {
    return user.id === userId;
  }, [user, userId]);

  return (
    <Container>
      {showOptions && (
        <Buttons>
          <Show to={`/posts/${id}`}>
            <FiEye size={16} />
          </Show>
          {canEdit() && (
            <Edit
              to={{
                pathname: `/posts/${id}/edit`,
                state: { post: { id, title, body, userId } },
              }}
            >
              <FiEdit size={16} />
            </Edit>
          )}
        </Buttons>
      )}

      <Title>{title}</Title>
      <Description>{body}</Description>

      {!!creator && (
        <Creator>
          By {creator.name}, {creator.website}
        </Creator>
      )}
    </Container>
  );
};

export default Post;
