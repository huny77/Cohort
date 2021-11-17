import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import client from '../../lib/api/client';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { changeSession, initialize } from '../../modules/study';
import { withdrawal } from '../../lib/api/auth';

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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
`;

const ModalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = ({ history, location }) => {
  const [session, setSession] = useState('');
  const [open, setOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);
  const [myInfoModalOpen, setMyInfoModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    history.push('/');
    setOpen(true);
  };

  const successWithdrawal = () => {
    dispatch(logout());
    history.push('/');
    setWithdrawalOpen(true);
  };

  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => setModalOpen(false);
  const enterModalHandleOpen = () => setEnterModalOpen(true);
  const enterModalHandleClose = () => setEnterModalOpen(false);
  const myInfoModalHandleOpen = () => setMyInfoModalOpen(true);
  const myInfoModalHandleClose = () => setMyInfoModalOpen(false);
  const withdrawalModalHandleopen = () => setWithdrawalModalOpen(true);
  const withdrawalModalHandleClose = () => setWithdrawalModalOpen(false);

  const [sideState, setSideState] = useState(false);

  const onSubmitSession = (e) => {
    dispatch(changeSession(e));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideState(open);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const withdrawalHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWithdrawalOpen(false);
  };

  if (location.pathname === '/study') {
    return null;
  }

  return (
    <>
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
            <Drawer
              anchor="left"
              open={sideState}
              onClose={toggleDrawer(false)}
            >
              <h1 style={{ marginLeft: '5rem', marginRight: '5rem' }}>
                Cohort
              </h1>
              <Divider />

              <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                xs={12}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Grid item>
                  <List>
                    <StyledLink to="/">
                      <ListItem button>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        메인화면
                      </ListItem>
                    </StyledLink>
                    <ListItem button onClick={modalHandleOpen}>
                      <ListItemIcon>
                        <CreateIcon />
                      </ListItemIcon>
                      방만들기
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        enterModalHandleOpen();
                        setSession('');
                      }}
                    >
                      <ListItemIcon>
                        <ConnectWithoutContactIcon />
                      </ListItemIcon>
                      참여하기
                    </ListItem>
                    <StyledLink to="/post">
                      <ListItem button>
                        <ListItemIcon>
                          <WysiwygIcon />
                        </ListItemIcon>
                        코드게시판
                      </ListItem>
                    </StyledLink>
                  </List>
                </Grid>

                {user && (
                  <Grid item>
                    <List>
                      <ListItem button onClick={myInfoModalHandleOpen}>
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
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} variant="filled" severity="success">
          로그아웃에 성공했습니다.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={withdrawalOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={withdrawalHandleClose}
      >
        <MuiAlert
          onClose={withdrawalHandleClose}
          variant="filled"
          severity="success"
        >
          회원탈퇴에 성공했습니다.
        </MuiAlert>
      </Snackbar>

      {/* 방만들기 모달 */}
      <div>
        <Modal
          keepMounted
          open={modalOpen}
          onClose={modalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            {user ? (
              // 로그인 했을 때
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  스터디룸 만들기
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  방 접속 코드:
                </Typography>
                {user && user.status === 'success' && (
                  <div>
                    <TextField
                      id="outlined-basic"
                      value={user.data.mail
                        .substring(0, parseInt(user.data.mail.length) - 10)
                        .replace(/\./g, '')}
                      variant="outlined"
                      readOnly
                    />
                  </div>
                )}

                <Button variant="outlined" onClick={modalHandleClose}>
                  취소
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onSubmitSession(
                      user.data.mail
                        .substring(0, parseInt(user.data.mail.length) - 10)
                        .replace(/\./g, ''),
                    );
                    modalHandleClose();
                    history.push('/study');
                  }}
                >
                  생성
                </Button>
              </>
            ) : (
              // 로그인하지 않았을 때
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  로그인이 필요한 기능입니다
                </Typography>

                <Button variant="outlined" onClick={modalHandleClose}>
                  닫기
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </div>

      {/* 참여하기 모달 */}
      <div>
        <Modal
          keepMounted
          open={enterModalOpen}
          onClose={enterModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            {user ? (
              // 로그인을 했을 때
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  스터디룸 참여하기
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  접속 코드를 입력해주세요
                </Typography>
                {user && user.status === 'success' && (
                  <div>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                    />
                  </div>
                )}

                <Button variant="outlined" onClick={enterModalHandleClose}>
                  취소
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    onSubmitSession(session);
                    enterModalHandleClose();
                    history.push('/study');
                  }}
                >
                  참여
                </Button>
              </>
            ) : (
              // 로그인하지 않았을 때
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  로그인이 필요한 기능입니다.
                </Typography>

                <Button variant="outlined" onClick={enterModalHandleClose}>
                  닫기
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </div>
      {/* 내 정보 모달 */}
      <div>
        {/* <Button onClick={modalHandleOpen}>테스트버튼</Button> */}
        <Modal
          keepMounted
          open={myInfoModalOpen}
          onClose={myInfoModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              내 정보
            </Typography>
            {user && user.status === 'success' && (
              <>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  이메일: {user.data.mail}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  이름: {user.data.name}
                </Typography>{' '}
              </>
            )}

            <Button variant="outlined" onClick={myInfoModalHandleClose}>
              닫기
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                withdrawalModalHandleopen();
              }}
            >
              회원탈퇴
            </Button>
          </Box>
        </Modal>
      </div>
      <div>
        {/* 회원탈퇴 상세 모달 */}
        <Modal
          keepMounted
          open={withdrawalModalOpen}
          onClose={withdrawalModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              정말 회원탈퇴 하시겠습니까
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                withdrawalModalHandleClose();
              }}
            >
              아니오
            </Button>
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  const response = await withdrawal(user.data.mail);
                  if (response.data.status === 'success') {
                    successWithdrawal();
                    withdrawalModalHandleClose();
                    myInfoModalHandleClose();
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              네
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Navbar);
