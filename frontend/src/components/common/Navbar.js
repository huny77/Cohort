import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  Button,
  ListItem,
  List,
  ListItemIcon,
  Box,
  Grid,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import GoogleAuth from './GoogleAuth';
import { logout } from '../../modules/user';

const CustomizedAppBar = styled(AppBar)`
  background-color: #f2f3f7;
`;

const CustomizedToolbar = styled(Toolbar)`
  width: 90%;
  margin: 0 auto;
  min-height: 0px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;

const CusotmizedButton = styled(Button)`
  color: black;
`;

const Navbar = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const [sideState, setSideState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideState(open);
  };

  return (
    <Box>
      <CustomizedAppBar elevation={0}>
        <CustomizedToolbar>
          <Box sx={{ flexGrow: 1 }}>
            {/* <CusotmizedButton onClick={toggleDrawer(true)}>
              상세메뉴
            </CusotmizedButton> */}
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer anchor="left" open={sideState} onClose={toggleDrawer(false)}>
            <h1 style={{ marginLeft: '5rem', marginRight: '5rem' }}>Cohort</h1>
            <Divider />

            <Grid
              item
              container
              direction="column"
              justifyContent="space-around"
              xs={12}
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <Grid item xs={10}>
                <List>
                  <ListItem button>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    메인화면
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CreateIcon />
                    </ListItemIcon>
                    방만들기
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ConnectWithoutContactIcon />
                    </ListItemIcon>
                    참여하기
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <WysiwygIcon />
                    </ListItemIcon>
                    코드게시판
                  </ListItem>
                </List>
              </Grid>

              {user && (
                <Grid item xs={2}>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      내정보
                    </ListItem>
                    <ListItem button onClick={onLogout}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      로그아웃
                    </ListItem>
                  </List>
                </Grid>
              )}
            </Grid>
          </Drawer>
          {/* <CusotmizedButton>로그인</CusotmizedButton> */}
          <GoogleAuth />
        </CustomizedToolbar>
      </CustomizedAppBar>
    </Box>
  );
};

export default Navbar;
