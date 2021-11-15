import React, { useState, useEffect, useCallback } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
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
      <button onClick={getResult}>실행</button>
      <div>인풋</div>
      <Editor
        height="20vh"
        language={language}
        value={input}
        theme="vs-dark" // light
        onChange={onChangeInput}
      />
      <div>아웃풋</div>
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
