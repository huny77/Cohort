import { Typography, Box} from '@mui/material';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

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
      <Box sx={{ marginLeft: '10%', margin: 'auto' }}>
        <Typography variant="h4" style={{ marginBottom: 30 }}>코드를 자유롭게 공유하고 학습하세요.</Typography>
        <br />
        <Box sx={{ display: 'flex' }}>
        <Typography variant="h4" style={{ marginBottom: 30 }}>Cohort는 </Typography>
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: 30, marginLeft: 15 }}>화상채팅과 함께</Typography>
        </Box>
        <br />
        <Typography variant="h4" style={{ fontWeight: 'bold', marginBottom: 30 }}>코드 동시 작성 기능을 제공합니다.</Typography>
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
