import { useEffect, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  writeComment,
  readComments,
  unloadComments,
} from '../../modules/comments';
import { changeField, initialize } from '../../modules/comments';
import { withRouter } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Pagination from 'react-js-pagination';
import './PaginationComment.css';

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

const Comment = ({ match, location, history }) => {
  const [page, setPage] = useState(1);
  const { post_id } = match.params;
  const dispatch = useDispatch();
  const {
    content,
    mail,
    comment,
    commentError,
    comments,
    commentsError,
    commentsLoading,
    post,
    postLoading,
    // lastPage,
  } = useSelector(({ comments, user, loading, post }) => ({
    content: comments.content,
    mail: user.mail,
    comment: comments.comment,
    commentError: comments.commentError,
    comments: comments.comments,
    commentsError: comments.commentsError,
    commentsLoading: loading['comments/READ_COMMENTS'],
    post: post.post,
    postLoading: loading['post/READ_POST'],
    // lastPage: comments.comments.data[0].totalPages,
  }));

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(readComments({ post_id, page }));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadComments());
    };
  }, [dispatch, post_id]);

  const onChangecontent = (e) => {
    onChangeField({ key: 'content', value: e.target.value });
  };

  // 코멘트 작성 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (comment) {
      dispatch(readComments({ post_id, page }));
      dispatch(initialize());
    }
    if (commentError) {
      console.log(commentError);
    }
  }, [dispatch, post_id, comment, commentError, page]);

  // 코멘트 등록
  const onPublish = () => {
    dispatch(
      writeComment({
        post_id,
        content,
        mail,
      }),
    );
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onPublish();
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
    dispatch(readComments({ post_id, page }));
  };

  return (
    <>
      <div
        style={{
          border: '1px solid #a0a0a0',
          borderRadius: '5px',
          padding: '5px',
        }}
      >
        {!postLoading && post && post.status === 'success'
          ? `댓글(${post.data.comments.length})`
          : `댓글(0)`}
      </div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {!commentsLoading &&
          comments &&
          comments.status === 'success' &&
          comments.data.map((comment) => (
            <>
              <ListItem alignItems="flex-start" key={comment.id}>
                <ListItemAvatar>
                  <Avatar alt="profile" src={comment.user.image} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="div"
                        variant="button"
                        color="text.primary"
                      >
                        {comment.user.name}
                      </Typography>
                      <Typography
                        sx={{ display: 'inline', m: 2 }}
                        component="div"
                        variant="overline"
                        color="text.primary"
                      >
                        {timeForToday(comment.created)}
                      </Typography>
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.content}
                      </Typography>
                      <Divider component="li" sx={{ mt: 1 }} />
                    </>
                  }
                />
              </ListItem>
            </>
          ))}
        {!commentsLoading && comments && comments.status === 'success' && (
          <Pagination
            activePage={page}
            itemsCountPerPage={1}
            totalItemsCount={comments.data[0].totalPages}
            pageRangeDisplayed={5}
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlePageChange}
          />
        )}
      </List>
      {mail && (
        <Box
          sx={{
            maxWidth: '100%',
          }}
        >
          <div style={{ display: 'flex' }}>
            <TextField
              fullWidth
              label="댓글작성"
              id="fullWidth"
              value={content}
              onChange={onChangecontent}
              onKeyPress={onKeyPress}
            />
            <Button variant="outlined" onClick={onPublish}>
              등록
            </Button>
          </div>
        </Box>
      )}
    </>
  );
};

export default withRouter(Comment);
