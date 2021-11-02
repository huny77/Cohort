import { CardMedia, Typography, Box, Card } from '@mui/material';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const CustomizedText = styled(Typography)`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const ZoomBox = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-size: cover;
  font-family: Nunito;
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform: ${(props) => (props.inView ? `scale(100%)` : `scale(85%)`)};
  transition: 2s;
`;

const renderContent = () => {
  return (
    <>
      <Box sx={{ marginLeft: '10%', paddingTop: '10%', margin: 'auto' }}>
        <CustomizedText>코드를 자유롭게 공유하고 학습하세요.</CustomizedText>
        <br />
        <CustomizedText>Cohort는 화상채팅과 함께</CustomizedText>
        <br />
        <CustomizedText>코드 동시 작성 기능을 제공합니다.</CustomizedText>
      </Box>
      <img
        src={`${process.env.PUBLIC_URL + '/assets/bgImage2.jpg'}`}
        alt="codeImage"
        style={{ width: '50%', height: '80%', margin: 'auto' }}
      />
    </>
  );
};

const Section2 = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  return (
    <ZoomBox inView={inView} ref={ref} id="our-service">
      {renderContent()}
    </ZoomBox>
  );
};

export default Section2;
