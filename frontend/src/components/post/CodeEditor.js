import React, { useState, useEffect, useCallback } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize, writePost } from '../../modules/write';
import { Input } from '@mui/material';
import { withRouter } from 'react-router';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ContentCopyTwoTone } from '@mui/icons-material';

const CodeEditor = ({ history }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { language, site, title, content, mail, post, postError } = useSelector(
    ({ write, user }) => ({
      language: write.language,
      site: write.site,
      title: write.title,
      content: write.content,
      mail: user.mail,
      post: write.post,
      postError: write.postError,
    }),
  );
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

  const onChangeLangauge = (e) => {
    onChangeField({ key: 'language', value: e.target.value });
  };
  const onChangeSite = (e) => {
    onChangeField({ key: 'site', value: e.target.value });
  };
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value });
  };
  const onChangeContent = (e) => {
    onChangeField({ key: 'content', value: e });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const onPublish = () => {
    if (!title || !content) {
      return setOpen(true);
    }
    dispatch(
      writePost({
        language,
        site,
        title,
        content,
        mail,
      }),
    );
  };
  // 취소
  const onCancel = () => {
    history.goBack();
  };
  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      history.push('/post');
    }
    if (postError) {
      console.log(postError);
    }
  }, [history, post, postError]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '20rem',
          justifyContent: 'flex-start',
        }}
      >
        <Button variant="contained" onClick={onCancel}>
          취소
        </Button>
        <Button variant="contained" onClick={onPublish}>
          작성
        </Button>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">language</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={language}
            label="language"
            onChange={onChangeLangauge}
          >
            <MenuItem value={'python'}>python</MenuItem>
            <MenuItem value={'java'}>java</MenuItem>
            <MenuItem value={'cpp'}>cpp</MenuItem>
            <MenuItem value={'c'}>c</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">site</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={site}
            label="site"
            onChange={onChangeSite}
          >
            <MenuItem value={'BOJ'}>BOJ</MenuItem>
            <MenuItem value={'programmers'}>programmers</MenuItem>
            <MenuItem value={'goorm'}>goorm</MenuItem>
            <MenuItem value={'SWEA'}>SWEA</MenuItem>
            <MenuItem value={'HackerRank'}>HackerRank</MenuItem>
            <MenuItem value={'LeetCode'}>LeetCode</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">제목</InputLabel>
          <Input style={{ width: '30rem' }} onChange={onChangeTitle} />
        </FormControl>
      </div>
      <Editor
        height="50vh"
        language={language}
        value={content}
        theme="vs-dark" // light
        onChange={onChangeContent}
        // options={{ readOnly: 'true' }}
      />
      {/* {result} */}
      <div>run결과:</div>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          제목과 코드를 입력해주세요.
        </Alert>
      </Snackbar>
    </>
  );
};

export default withRouter(CodeEditor);
