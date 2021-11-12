import { useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
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
import qs from 'qs';

const Comment = ({ match, location }) => {
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
    // lastPage,
  } = useSelector(({ comments, user, loading }) => ({
    content: comments.content,
    mail: user.mail,
    comment: comments.comment,
    commentError: comments.commentError,
    comments: comments.comments,
    commentsError: comments.commentsError,
    commentsLoading: loading['comments/READ_COMMENTS'],
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
    const page = 1;
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
    const page = 1;
    if (comment) {
      dispatch(readComments({ post_id, page }));
    }
    if (commentError) {
      console.log(commentError);
    }
  }, [dispatch, post_id, comment, commentError, onChangeField]);

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

  return (
    <>
      <div style={{ backgroundColor: 'gray' }}>댓글 (개수)</div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {!commentsLoading &&
          comments &&
          comments.data.map((comment) => (
            <ListItem alignItems="flex-start" key={comment.id}>
              <ListItemText
                primary={`댓글 id: ${comment.id}`}
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
                    {new Date(`${comment.created}`).toLocaleDateString()}
                  </>
                }
              />
            </ListItem>
          ))}
      </List>
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
            onChange={onChangecontent}
          />
          <Button variant="outlined" onClick={onPublish}>
            등록
          </Button>
        </div>
      </Box>
    </>
  );
};

export default withRouter(Comment);
