import React from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/post/CodeEditor';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 7rem;
  align-items: center;
`;

const WritePage = () => {
  return (
    <PostContainer>
      <CodeEditor />
      <div>결과:</div>
      <button>run</button>
    </PostContainer>
  );
};

export default WritePage;
