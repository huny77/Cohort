import { useEffect } from 'react';
import * as React from 'react';
import { styled, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts, bestPostsList } from '../../modules/posts';
import { Link } from 'react-router-dom';
import qs from 'qs';

const StyledTableCell = styled(TableCell)`
  font-weight: bolder;
  background-color: #f1f3f5;
`;

const RecommendTableCell = styled(TableCell)`
  color: blue;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

const PostList = ({ location }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, bestPosts, bestPostsLoading } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      bestPosts: posts.bestPosts,
      bestPostsError: posts.bestPostsError,
      bestPostsLoading: loading['posts/BEST_POSTS'],
    }),
  );

  useEffect(() => {
    const { page = 1 } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(
      listPosts({
        page,
      }),
    );
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(bestPostsList());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center">사이트</StyledTableCell>
            <StyledTableCell align="center">언어</StyledTableCell>
            <StyledTableCell align="center">문제</StyledTableCell>
            <StyledTableCell align="center">작성자</StyledTableCell>
            <StyledTableCell align="center">작성일</StyledTableCell>
            <StyledTableCell align="center">추천</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!bestPostsLoading &&
            bestPosts &&
            bestPosts.data.slice(0, 3).map((bestPost) => (
              <TableRow key={bestPost.created + bestPost.id} style={{ backgroundColor: '#FFE7E7' }}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ width: 100 }}
                >
                  <Chip label="Best code" color="error" variant="outlined" />
                </TableCell>
                <TableCell align="center" style={{ width: 100, color: '#FF4947', fontWeight: 'bold' }}>
                  {bestPost.site}
                </TableCell>
                <TableCell align="center" style={{ width: 100, color: '#FF4947', fontWeight: 'bold' }}>
                  {bestPost.language}
                </TableCell>
                <TableCell align="center" style={{ color: '#FF4947', fontWeight: 'bold' }}>
                  <StyledLink to={`/post/${bestPost.id}`}>
                    {bestPost.title}
                  </StyledLink>
                </TableCell>
                <TableCell align="center" style={{ width: 150, fontWeight: 'bold' }}>
                  {bestPost.user.name}
                </TableCell>
                <TableCell align="center" style={{ width: 100, fontWeight: 'bold' }}>
                  {/* {new Date(post.created).toLocaleDateString()} */}
                  {timeForToday(bestPost.created)}
                </TableCell>
                <RecommendTableCell align="center" style={{ width: 100, fontWeight: 'bold' }}>
                  {bestPost.like}
                </RecommendTableCell>
              </TableRow>
            ))}
          {!loading &&
            posts &&
            posts.data.map((post) => (
              <TableRow key={post.created + post.id}>
                <TableCell
                  component="th"
                  scope="row"
                  align="center"
                  style={{ width: 100 }}
                >
                  {post.id}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {post.site}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {post.language}
                </TableCell>
                <TableCell align="center">
                  <StyledLink to={`/post/${post.id}`}>{post.title}</StyledLink>
                </TableCell>
                <TableCell align="center" style={{ width: 150 }}>
                  {post.user.name}
                </TableCell>
                <TableCell align="center" style={{ width: 100 }}>
                  {/* {new Date(post.created).toLocaleDateString()} */}
                  {timeForToday(post.created)}
                </TableCell>
                <RecommendTableCell align="center" style={{ width: 100 }}>
                  {post.like}
                </RecommendTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(PostList);
