import styled from 'styled-components';
import { Typography, Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const CustomizedRoot = styled.div`
  min-height: 110vh;
  background-image: url(${process.env.PUBLIC_URL + '/assets/bgImage1.jpg'});
  background-repeat: no-repeat;
  background-size: cover;
  font-family: Nunito;
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform: ${(props) => (props.inView ? `scale(100%)` : `scale(85%)`)};
  transition: 2s;
`;

const renderContent = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ mr:7, mt:20 }}>
          <h1 style={{ fontSize: '5rem' }}>Cohort</h1>
          <Box sx={{ display: 'flex' }}>
          <Typography variant="h4" style={{ fontWeight: 'bold' }}>"학습의 공유"</Typography>
          <Typography variant="h4">라는 비전으로</Typography>
          </Box>
          <br />
          <Typography variant="h4">누구나 알고리즘을 알려주고 배우는</Typography>
          <br />
          <Typography variant="h4">생태계를 만들어나가고 있습니다.</Typography>
        </Box>
      </Box>
    </>
  );
};

const Section1 = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  return (
    <>
      <CustomizedRoot inView={inView} ref={ref} id="about-cohort">
        {renderContent()}
      </CustomizedRoot>
    </>
  );
};

export default Section1;
