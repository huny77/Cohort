import PostViewer from '../components/post/PostViewer';
import styled from 'styled-components';
import Like from '../components/post/Like';
import Comment from '../components/post/Comment';

const StyledDiv = styled.div`
  max-width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const PostPage = () => {
  return (
    <StyledDiv>
      <div style={{ height: '6rem' }}></div>
      <PostViewer />
      <Like />
      <Comment />
    </StyledDiv>
  );
};

export default PostPage;
