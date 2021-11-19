import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const buildLink = ({ page }) => {
  const query = qs.stringify({ page });
  return `?${query}`;
};

const PaginationPostList = ({ location }) => {
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

  return (
    <PaginationBlock>
      <Link
        to={
          parseInt(page, 10) === 1
            ? undefined
            : buildLink({ page: parseInt(page, 10) - 1 })
        }
      >
        <button disabled={parseInt(page, 10) === 1}>이전</button>
      </Link>
      <div>{page}</div>
      <Link
        to={
          parseInt(page, 10) === lastPage
            ? undefined
            : buildLink({ page: parseInt(page, 10) + 1 })
        }
      >
        <button disabled={parseInt(page, 10) === lastPage}>다음</button>
      </Link>
    </PaginationBlock>
  );
};

export default withRouter(PaginationPostList);
