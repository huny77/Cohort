import React, { useState, useEffect, useCallback } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { useSelector, useDispatch } from 'react-redux';
import { codeRun, initialize } from '../../modules/run';

const CodeResult = () => {
  const dispatch = useDispatch();
  const { language, content, run, runError } = useSelector(
    ({ write, run }) => ({
      language: write.language,
      content: write.content,
      run: run.run,
      runError: run.Error,
    }),
  );

  const getResult = () => {
    if (content) {
      if (language === 'python') {
        dispatch(
          codeRun({
            language: 'python3',
            body: content,
          }),
        );
      } else {
        dispatch(
          codeRun({
            language,
            body: content,
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
      <button onClick={getResult}>실행</button>
      <Editor
        height="20vh"
        language={language}
        value={run ? run.output : null}
        theme="vs-dark" // light
        options={{ readOnly: 'true' }}
      />
    </>
  );
};

export default CodeResult;
