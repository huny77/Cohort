import React, { useEffect } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/post/CodeEditor';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CodeResult from '../components/post/CodeResult';
import { Helmet } from 'react-helmet-async';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 80%;
  margin: 0 auto;
  align-items: center;
`;

const WritePage = () => {
  const { mail } = useSelector(({ user }) => ({
    mail: user.mail,
  }));

  if (!mail) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Cohort - 코드 작성</title>
      </Helmet>
      <div>
        <div style={{ height: '4rem' }}></div>
        <PostContainer>
          <CodeEditor />
          <CodeResult />
        </PostContainer>
      </div>
    </>
  );
};

export default WritePage;
