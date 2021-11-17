import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Toolbar, Button, Modal, Box, Typography, Chip } from '@mui/material';
import { readPost, unloadPost } from '../../modules/post';
import { readLike, unloadLike } from '../../modules/like';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { removePost } from '../../lib/api/posts';
import { addLike, removeLike } from '../../lib/api/like';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const PostViewer = ({ match, history }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { post_id } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, mail, like, likeError, likeLoading } =
    useSelector(({ post, loading, user, like }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      mail: user.mail,
      like: like.like,
      likeError: like.error,
      likeLoading: loading['like/READ_LIKE'],
    }));

  useEffect(() => {
    dispatch(readPost(post_id));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, post_id]);

  // 좋아요 조회
  useEffect(() => {
    dispatch(readLike(post_id));
    // 언마운트될 때 리덕스에서 좋아요 데이터 없애기
    return () => {
      dispatch(unloadLike());
    };
  }, [dispatch, post_id]);

  // 에러 발생 시
  if (error) {
    if (error.response && error.response.status === 404) {
      return <div>존재하지 않는 포스트입니다.</div>;
    }
    return <div>오류 발생!</div>;
  }

  // 로딩중이거나 아직 포스트 데이터가 없을 때
  if (loading || !post) {
    return null;
  }

  // 게시글 삭제 함수
  const onRemove = async () => {
    try {
      await removePost(post.data.id);
      history.push('/post');
    } catch (e) {
      console.log(e);
    }
  };

  // 좋아요 등록
  const onAddLike = async ({ mail, post_id }) => {
    try {
      await addLike({ mail, post_id });
      dispatch(readLike(post_id));
    } catch (e) {
      console.log(e);
    }
  };

  // 좋아요 취소
  const onRemoveLike = async (mail, post_id) => {
    try {
      await removeLike(mail, post_id);
      dispatch(readLike(post_id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {!loading && post && post.data.user.mail === mail && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleOpen}
              startIcon={<DeleteIcon />}
            >
              글삭제
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6">
                게시글을 정말 삭제하시겠습니까?
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button color="primary" onClick={handleClose}>
                  취소
                </Button>
                <Button color="error" onClick={onRemove}>
                  삭제
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
      <Toolbar
        style={{
          backgroundColor: 'gray',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>{post.data.site}</div>
        <div>{post.data.language}</div>
        <div>{post.data.title}</div>
        <div>{moment(post.data.created).format('YYYY-MM-DD HH:mm:ss')}</div>
        {/* <div>{post.data.created}</div> */}
      </Toolbar>
      <Editor
        height="50vh"
        language={post.data.language}
        value={post.data.content}
        theme="vs-dark" // light
        options={{ readOnly: 'true' }}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          margin: '8px',
        }}
      >
        {/* 좋아요취소 */}
        {!likeLoading &&
          like &&
          like.status === 'success' &&
          like.data.includes(`${mail}`) &&
          mail && (
            <IconButton>
              <FavoriteIcon
                color="error"
                onClick={() => onRemoveLike(mail, post_id)}
              />
            </IconButton>
          )}

        {/* 좋아요등록 */}
        {!likeLoading &&
          like &&
          like.status === 'success' &&
          !like.data.includes(`${mail}`) &&
          mail && (
            <IconButton>
              <FavoriteBorderIcon
                onClick={() => onAddLike({ mail, post_id })}
              />
            </IconButton>
          )}

        {!likeLoading && like && like.status === 'success' && (
          <Box sx={{ ml: 1 }}>{like.data.length}명이 좋아합니다.</Box>
        )}
      </div>
    </div>
  );
};

export default withRouter(PostViewer);
