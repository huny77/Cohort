import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Toolbar } from '@mui/material';
import { readPost, unloadPost } from '../../modules/post';

const PostViewer = ({ match }) => {
  const { post_id } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(post_id));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
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

  return (
    <div>
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
        <div>{post.data.created}</div>
      </Toolbar>
      <Editor
        height="50vh"
        language={post.data.language}
        value={post.data.content}
        theme="vs-dark" // light
        options={{ readOnly: 'true' }}
      />
    </div>
  );
};

export default withRouter(PostViewer);
