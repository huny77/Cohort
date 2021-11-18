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
      level: 3,
      draggable: false
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(36.35536410083951, 127.29835091080787);
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

    const content = '<div class="wrap" style="background-color:white;">' + 
                '    <div class="info" style="">' + 
                '        <div class="title" style="font-weight: bold; font-size: 20px; margin-bottom:5%; background-color:#E2E2E2;">' + 
                '            SSAFY 대전캠퍼스' + 
                '        </div>' + 
                '        <div class="body">' + 
                '            <div class="desc">' + 
                '                <div class="ellipsis">대전광역시 유성구 동대서로 98-39</div>' + 
                '                <div class="jibun ellipsis">TEL) 02-3429-5100</div>' + 
                '                <div style="margin-top:3%"><a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" target="_blank" class="link" style="text-decoration:none;">홈페이지</a></div>' + 
                '            </div>' + 
                '        </div>' + 
                '    </div>' +    
                '</div>';

    const position = new kakao.maps.LatLng(36.35635, 127.29835091080787)
    const overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: position     
    });

    overlay.setMap(map);
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
