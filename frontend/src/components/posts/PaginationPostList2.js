import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
// import styled from 'styled-components';
import './PaginationPostList2.css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PaginationPostList2 = ({ location, history }) => {
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여 주지 않음
  if (!posts || loading) return null;

  // page가 없으면 1을 기본값으로 사용
  const { page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const handlePageChange = (page) => {
    history.push(`post?page=${page}`);
  };

  return (
    <>
      <Pagination
        activePage={parseInt(page, 10)}
        itemsCountPerPage={1}
        totalItemsCount={lastPage}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
      />
    </>
  );
};

export default withRouter(PaginationPostList2);
