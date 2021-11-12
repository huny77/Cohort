import { useEffect, useCallback } from 'react';
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
import qs from 'qs';
import { Avatar } from '@mui/material';

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
                    sx={{ display: 'inline', m:2}}
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
                    <Divider component="li" sx={{mt:1}} />
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
