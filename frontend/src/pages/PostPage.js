import PostViewer from '../components/post/PostViewer';
import styled from 'styled-components';
import Comment from '../components/post/Comment';
import { Helmet } from 'react-helmet-async';

const StyledDiv = styled.div`
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const PostPage = () => {
  return (
    <>
      <Helmet>
        <title>Cohort - 게시판</title>
      </Helmet>
      <StyledDiv>
        <div style={{ height: '6rem' }}></div>
        <PostViewer />
        <Comment />
      </StyledDiv>
    </>
  );
};

export default PostPage;
