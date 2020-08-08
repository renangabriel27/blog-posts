import React, { useCallback } from 'react';
import { FiTrash, FiEdit, FiEye } from 'react-icons/fi';
import swal from 'sweetalert';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Title,
  Edit,
  Show,
  Delete,
  Buttons,
  Description,
} from './styles';

export interface PostProps {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Post: React.FC<PostProps> = ({ id, title, body, userId }) => {
  const { user } = useAuth();
  const storageKey = `@Blog::${user.id}::posts`;

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
        const posts = localStorage.getItem(storageKey);

        if (posts) {
          const parsedData = JSON.parse(posts);
          const newPosts = parsedData.filter((post: PostProps) => {
            return post.id !== id;
          });

          localStorage.removeItem(storageKey);
          localStorage.setItem(storageKey, JSON.stringify(newPosts));
          document.location.reload(true);
        }
      }
    });
  }, [id, storageKey]);

  return (
    <Container>
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
      <Title>{title}</Title>
      <Description>{body}</Description>
    </Container>
  );
};

export default Post;
