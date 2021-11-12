import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Toolbar } from '@mui/material';
import { readPost, unloadPost } from '../../modules/post';

const sampleData = {
  site: 'BOJ',
  language: 'python',
  title: '게시글 제목',
  script: `a = 5
b = 3
print(a+b)
  `,
  like: 3,
  date: '2021-01-01',
};

const PostViewer = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ post, loading }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
  }));

  useEffect(() => {
    // dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

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
        <div>{sampleData.site}</div>
        <div>{sampleData.language}</div>
        <div>{sampleData.title}</div>
        <div>{sampleData.date}</div>
      </Toolbar>
      <Editor
        height="50vh"
        language={sampleData.language}
        value={sampleData.script}
        theme="vs-dark" // light
        options={{ readOnly: 'true' }}
      />
    </div>
  );
};

export default withRouter(PostViewer);
