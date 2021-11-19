import { Button, Box } from '@mui/material';
import { withRouter } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const WriteButton = ({ history }) => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const onEnter = (e) => {
    history.push('/write');
  };
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse', p: 1, m: 1 }}>
        <Button
          variant="outlined"
          onClick={() => {
            if (user) {
              onEnter();
            } else {
              setOpen(true);
            }
          }}
        >
          코드 작성
        </Button>
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} variant="filled" severity="error">
          로그인이 필요한 기능입니다.
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default withRouter(WriteButton);
