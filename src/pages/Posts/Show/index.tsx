import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/storage';
import { useSwr } from '../../../hooks/swr';
import { POSTS_KEY } from '../../../contants/local-storage';

import Header from '../../../components/Header';
import Comment, { CommentProps } from '../../../components/Comment';
import Post, { PostProps } from '../../../components/Post';

import { Container } from '../../../styles/main';

const ShowPost: React.FC = () => {
  const { id } = useParams();
  const [allPosts] = useLocalStorage(POSTS_KEY(), []);

  const { data: postsData, error: postsError } = useSwr<PostProps>(
    `/posts/${id}`,
  );
  const { data: commentsData } = useSwr<CommentProps[]>(
    `/posts/${id}/comments`,
  );

  const [post, setPost] = useState<PostProps>({} as PostProps);
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    if (postsData) {
      setPost(postsData);
    }

    if (postsError) {
      if (allPosts) {
        const showPost = allPosts.find((item: PostProps) => {
          return item.id === id;
        });
        setPost(showPost);
      }
    }

    if (commentsData) {
      setComments(commentsData);
    }
  }, [id, postsData, postsError, allPosts, commentsData]);

  if (!post && !postsData && !commentsData) {
    return (
      <Container>
        <Header>
          <h1>Post</h1>
        </Header>
        <h1>Loading...</h1>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Post</h1>
      </Header>

      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
        userId={post.userId}
        showOptions={false}
      />

      <h2>Comments - {comments.length}</h2>

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

export default ShowPost;
