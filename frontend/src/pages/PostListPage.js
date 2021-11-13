import React from 'react';
import styled from 'styled-components';
import PostList from '../components/posts/PostList';
import PaginationPostList from '../components/posts/PaginationPostList';
import PaginationPostList2 from '../components/posts/PaginationPostList2';
import WriteButton from '../components/posts/WriteButton';

const PostListContainer = styled.div`
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const PostListPage = () => {
  return (
    <>
      <div style={{ height: '4rem' }}></div>
      <PostListContainer>
        <WriteButton />
        <PostList />
      </PostListContainer>
      <PaginationPostList2 />
    </>
  );
};

export default PostListPage;
