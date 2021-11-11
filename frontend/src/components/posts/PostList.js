import { useEffect } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../modules/posts';
import { Link } from 'react-router-dom';

const StyledTableCell = styled(TableCell)`
  background-color: black;
  color: white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, error, loading } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
  }));

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">사이트</StyledTableCell>
            <StyledTableCell align="center">언어</StyledTableCell>
            <StyledTableCell align="center">문제</StyledTableCell>
            <StyledTableCell align="center">작성자</StyledTableCell>
            <StyledTableCell align="center">추천</StyledTableCell>
            <StyledTableCell align="center">작성일</StyledTableCell>
          </TableRow>
        </TableHead>

        {!loading &&
          posts &&
          posts.data.map((post) => (
            <TableRow key={post.created}>
              <TableCell component="th" scope="row" align="center">
                {post.site}
              </TableCell>
              <TableCell align="center">{post.language}</TableCell>
              <TableCell align="center">
                <StyledLink to={`/post/${post.id}`}>{post.title}</StyledLink>
              </TableCell>
              <TableCell align="center">{post.user.name}</TableCell>
              <TableCell align="center">{post.like}</TableCell>
              <TableCell align="center">
                {new Date(post.created).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
      </Table>
    </TableContainer>
  );
};

export default PostList;
