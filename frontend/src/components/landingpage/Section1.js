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

const CustomizedText = styled(Typography)`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const renderContent = () => {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ marginRight: '10%', paddingTop: '10%' }}>
          <h1 style={{ fontSize: '5rem' }}>Cohort</h1>
          <CustomizedText>"학습의 공유"라는 비전으로</CustomizedText>
          <br />
          <CustomizedText>누구나 알고리즘을 알려주고 배우는</CustomizedText>
          <br />
          <CustomizedText>생태계를 만들어나가고 있습니다.</CustomizedText>
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
