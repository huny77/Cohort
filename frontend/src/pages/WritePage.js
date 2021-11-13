import React from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/post/CodeEditor';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 80%;
  margin: 0 auto;
  align-items: center;
`;

const WritePage = () => {
  return (
    <div>
      <div style={{ height: '4rem' }}></div>
      <PostContainer>
        <CodeEditor />
        <div>결과:</div>
        <button>run</button>
      </PostContainer>
    </div>
  );
};

export default WritePage;
