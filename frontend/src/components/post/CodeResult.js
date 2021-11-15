import React, { useState, useEffect, useCallback } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { Box, Typography, Divider, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useSelector, useDispatch } from 'react-redux';
import { codeRun, initialize, changeField } from '../../modules/run';

const CodeResult = () => {
  const dispatch = useDispatch();
  const { language, content, run, runError, input } = useSelector(
    ({ write, run }) => ({
      language: write.language,
      content: write.content,
      run: run.run,
      runError: run.Error,
      input: run.input,
    }),
  );

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  const onChangeInput = (e) => {
    onChangeField({ key: 'input', value: e });
  };

  const getResult = () => {
    if (content) {
      if (language === 'python') {
        dispatch(
          codeRun({
            language: 'python3',
            body: content,
            input,
          }),
        );
      } else {
        dispatch(
          codeRun({
            language,
            body: content,
            input,
          }),
        );
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      <Box sx={{ width: '100%', border: '1px solid', mt: 3, p: 2, backgroundColor: '#EEEEEE' }}>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <ErrorOutlineIcon style={{ color: 'grey', marginRight: '10' }} />
          <Typography style={{ color: 'grey' }} >Input을 입력하고 실행을 선택하면 Output 결과를 확인할 수 있습니다.
          Input 값을 넣지 않으면 시간초과 에러가 발생합니다.</Typography>
        </Box>
        <Divider style={{ marginTop: 30, marginBottom: 20 }} />
        <Box sx={{ display: 'flex', mr:2 }}>
          <Box sx={{ width: '80%' }}>
            <Typography style={{ fontWeight: 'bold', marginBottom: 5 }} >Input</Typography>
            <Editor
              height="11rem"
              language={language}
              value={input}
              theme="vs-dark" // light
              onChange={onChangeInput}
            />
          </Box>
          <Box sx={{ width: '80%', ml:2 }}>
            <Typography style={{ fontWeight: 'bold', marginBottom: 5 }} >Output</Typography>
            <Editor
              height="11rem"
              language={language}
              value={run ? run.output : null}
              theme="vs-dark" // light
              options={{ readOnly: 'true' }}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr:2, mt:2 }}>
          <Button variant="contained" onClick={getResult} >실행</Button>
        </Box>
      </Box>
    </>
  );
};

export default CodeResult;
