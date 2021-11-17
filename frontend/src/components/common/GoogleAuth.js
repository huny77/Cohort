import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { oauth } from '../../modules/auth';
import { check, userSaga } from '../../modules/user';
import { setCookie } from '../../lib/cookie';
import { tempSetUser } from '../../modules/user';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const GoogleAuth = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { google, googleError, user } = useSelector(({ auth, user }) => ({
    google: auth.google,
    googleError: auth.googleError,
    user: user.user,
  }));

  const responseGoogle = (response) => {
    const mail = response.profileObj.email;
    const image = response.profileObj.imageUrl;
    const name = response.profileObj.name;
    dispatch(oauth({ mail, image, name }));
  };

  useEffect(() => {
    if (googleError) {
      console.log('오류 발생');
      console.log(googleError);
      setError('로그인 실패');
      return;
    }
    if (google) {
      const mail = google.data.mail;
      console.log('로그인 성공');
      dispatch(check(mail));
      history.push('/');
      setOpen(true);
    }
  }, [google, googleError, dispatch, history]);

  useEffect(() => {
    if (user) {
      // history.push('/');
      try {
        setCookie('mail', user.data.mail, { path: '/' });
        setCookie('name', user.data.name, { path: '/' });
        setCookie('image', user.data.image, { path: '/' });
        dispatch(tempSetUser(user.data.mail));
      } catch (e) {
        console.log('cookie is not working');
      }
    }
  }, [history, user, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {user ? (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt="profile" src={user.data.image} />
          <p style={{ color: 'black' }}>{user.data.name}님</p>
        </Stack>
      ) : (
        <div>
          <GoogleLogin
            clientId="899382410925-6lj3a723pa8almrn6het3chtt7l0ta1u.apps.googleusercontent.com"
            buttonText="로그인"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      )}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} variant="filled" severity="success">
          로그인에 성공했습니다.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default withRouter(GoogleAuth);
