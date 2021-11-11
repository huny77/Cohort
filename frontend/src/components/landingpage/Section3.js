import {
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ZoomBox = styled(Box)`
  display: flex;
  min-height: 100vh;
  background-size: cover;
  background-color: #f2f3f7;
  font-family: Nunito;
  opacity: ${(props) => (props.inView ? 1 : 0)};
  transform: ${(props) => (props.inView ? `scale(100%)` : `scale(85%)`)};
  transition: 2s;
`;

const CustomizedText = styled(Typography)`
  font-size: 2rem;
  font-weight: 20px;
`;

const renderContent = () => {
  return (
    <>
      <Box sx={{ margin: 'auto' }}>
        <CustomizedText sx={{ marginBottom: 1, fontWeight: 100 }}>
          해당 알고리즘 사이트에서 어려운 문제들을 스터디하세요.
        </CustomizedText>
        <CustomizedText sx={{ marginBottom: 10 }}>
          5개의 언어를 활용해 알고리즘 문제를 해결할 수 있습니다.
        </CustomizedText>
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      margin="auto"
                    >
                      백준 온라인 저지
                    </Typography>
                    <Button
                      endIcon={<NearMeIcon />}
                      href="https://www.acmicpc.net/"
                      target="_blank"
                    >
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
                  image={`${
                    process.env.PUBLIC_URL + '/assets/programmers.jpg'
                  }`}
                  alt="programmers"
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      margin="auto"
                    >
                      프로그래머스
                    </Typography>
                    <Button
                      endIcon={<NearMeIcon />}
                      href="https://programmers.co.kr/"
                      target="_blank"
                    >
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
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      margin="auto"
                    >
                      구름 레벨
                    </Typography>
                    <Button
                      endIcon={<NearMeIcon />}
                      href="https://level.goorm.io/"
                      target="_blank"
                    >
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
