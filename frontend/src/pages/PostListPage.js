import React from 'react';
import styled from 'styled-components';
import PostList from '../components/posts/PostList';
import PaginationPostList from '../components/posts/PaginationPostList';
import PaginationPostList2 from '../components/posts/PaginationPostList2';

const PostListContainer = styled.div`
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const PostListPage = () => {
  return (
    <>
      <div style={{ height: '6rem' }}></div>
      <PostListContainer>
        <PostList />
      </PostListContainer>
      <PaginationPostList2 />
    </>
  );
};

export default PostListPage;
