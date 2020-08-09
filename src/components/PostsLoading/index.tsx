import React from 'react';

import PostLoading from '../PostLoading';

const PostsLoading: React.FC = () => {
  const posts = [1, 2, 3];

  return (
    <div>
      {posts.map((post) => {
        return <PostLoading key={post} />;
      })}
    </div>
  );
};

export default PostsLoading;
