import { Typography, Box, Grid, } from '@mui/material';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';

const { kakao } = window;

const CustomizedText = styled(Typography)`
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 1rem;
  text-align: center;
`;

const CustomizedText2 = styled(Typography)`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
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

const Location = () => {
  useEffect(()=> {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(36.35536410083951, 127.29835091080787),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(36.35536410083951, 127.29835091080787);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);
  }, [])
  return (
    <>
      <div id='map' style={{width:"500px", height:"400px"}}></div>
    </>
  )
}

const renderContent = () => {
  return (
    <>
      <Box sx={{ margin: 'auto', padding: 'auto' }}>
        <Grid container spacing={20}>
          <Grid item xs>
          <CustomizedText>궁금한 점은</CustomizedText>
          <CustomizedText>이곳으로 문의해주세요</CustomizedText>
          <br />
          <br />
          <br />
          <CustomizedText2>주소: 대전광역시 유성구 동서대로 98-39</CustomizedText2>
          </Grid>
        
          <Grid item xs>
          <Location />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const Section4 = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  return (
    <ZoomBox inView={inView} ref={ref} id="customer-support">
      {renderContent()}
    </ZoomBox>
  );
};

export default Section4;
