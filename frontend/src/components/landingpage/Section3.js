import { Typography, Box, Grid, Card, CardActionArea, CardMedia, CardContent, Button } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ZoomBox = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-size: cover;
  background-color: #F2F3F7;
  font-family: Nunito;
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform: ${(props) => (props.inView ? `scale(100%)` : `scale(85%)`)};
  transition: 2s;
`;

const renderContent = () => {
  return (
    <>
      <Box sx={{ margin: 'auto' }}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${process.env.PUBLIC_URL + '/assets/baejoon.png'}`}
                  alt="baejoon"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1, m: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" margin="auto">
                    백준 온라인 저지
                  </Typography>
                  <Button endIcon={<NearMeIcon />} href="https://www.acmicpc.net/">
                    이동
                  </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${process.env.PUBLIC_URL + '/assets/programmers.jpg'}`}
                  alt="programmers"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1, m: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" margin="auto">
                    프로그래머스
                  </Typography>
                  <Button endIcon={<NearMeIcon />} href="https://programmers.co.kr/">
                    이동
                  </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${process.env.PUBLIC_URL + '/assets/goorm.png'}`}
                  alt="goorm"
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1, m: 1 }}>
                  <Typography gutterBottom variant="h5" component="div" margin="auto">
                    구름 레벨
                  </Typography>
                  <Button endIcon={<NearMeIcon />} href="https://level.goorm.io/">
                    이동
                  </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const Section3 = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  return (
    <>
      <ZoomBox inView={inView} ref={ref} id="algorithm-site">
        {renderContent()}
      </ZoomBox>
    </>
  );
};

export default Section3;
