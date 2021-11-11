import React, { useState, useEffect, useCallback } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize, writePost } from '../../modules/write';
import { Input } from '@mui/material';

const CodeEditor = () => {
  const dispatch = useDispatch();

  const { language, site, title, content, mail } = useSelector(
    ({ write, user }) => ({
      language: write.language,
      site: write.site,
      title: write.title,
      content: write.content,
      mail: user.mail,
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
  const onPublish = () => {
    console.log(mail);
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

  return (
    <>
      <div
        style={{
          display: 'flex',
          width: '20rem',
          justifyContent: 'flex-start',
        }}
      >
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
      <button onClick={onPublish}>제출</button>
      <div>run결과:</div>
    </>
  );
};

export default CodeEditor;
