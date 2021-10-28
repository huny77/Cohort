import React from 'react';
import { Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">상세메뉴</Typography>
        <Typography variant="h6">로그인</Typography>
      </Toolbar>
    </>
  );
};

export default Header;
