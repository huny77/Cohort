import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link as Scroll } from 'react-scroll';

const CustomizedRoot = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Nunito;
`;

const CustomizedToolbar = styled(Toolbar)`
  width: 90%;
  margin: 0 auto;
  min-height: 0px;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

const CustomizedTitle = styled(Typography)`
  color: black;
  flex-grow: 1;
  font-family: Nunito;
  font-weight: bold;
`;

const CustomizedButton = styled(Button)`
  color: black;
`;

const CustomizedContainer = styled(Box)`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 11.5%;
`;

const CustomizedText = styled(Typography)`
  font-size: 4.5rem;
  font-family: Nunito;
`;

const CustomizedArrow = styled(IconButton)`
  font-size: 5rem;
`;

const Header = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <CustomizedRoot>
      <Box>
        <div style={{ height: '50px' }} />
        <CustomizedToolbar>
          <CustomizedTitle variant="h4">Cohort</CustomizedTitle>
          <Scroll to="about-cohort" smooth={true}>
            <CustomizedButton>Cohort 소개</CustomizedButton>
          </Scroll>
          <Scroll to="our-service" smooth={true}>
            <CustomizedButton>서비스 소개</CustomizedButton>
          </Scroll>
          <CustomizedButton>알고리즘 사이트</CustomizedButton>
          <CustomizedButton>고객지원</CustomizedButton>
        </CustomizedToolbar>
      </Box>
      <Collapse
        in={checked}
        {...(checked ? { timeout: 2500 } : {})}
        collapsedheight={50}
      >
        <CustomizedContainer>
          <CustomizedText>
            Welcome to <br />
            <span style={{ fontWeight: 'bold' }}>Cohort.</span>
          </CustomizedText>
          <Scroll to="about-cohort" smooth={true}>
            <CustomizedArrow>
              <ArrowDownwardIcon sx={{ fontSize: '5rem' }} />
            </CustomizedArrow>
          </Scroll>
        </CustomizedContainer>
      </Collapse>
    </CustomizedRoot>
  );
};

export default Header;
