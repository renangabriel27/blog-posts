import React, { useCallback } from 'react';
import { FiTrash, FiEdit, FiEye } from 'react-icons/fi';
import swal from 'sweetalert';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useLocalStorage } from '../../hooks/storage';
import { POSTS_KEY } from '../../contants/local-storage';

import {
  Container,
  Title,
  Edit,
  Show,
  Delete,
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
  const storageKey = POSTS_KEY();
  const [posts] = useLocalStorage(storageKey, []);
  const history = useHistory();

  const canEdit = useCallback(() => {
    return user.id === userId;
  }, [user, userId]);

  const handleDelete = useCallback(() => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this post!',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancel', 'Ok'],
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! Your post has been deleted!', {
          icon: 'success',
        });

        if (posts) {
          const newPosts = posts.filter((post: PostProps) => {
            return post.id !== id;
          });

          history.push({
            pathname: history.location.pathname,
            state: { posts: newPosts },
          });
        }
      }
    });
  }, [id, posts, history]);

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
          <Delete onClick={() => handleDelete()}>
            <FiTrash size={16} />
          </Delete>
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
