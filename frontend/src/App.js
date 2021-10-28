import React from 'react';
import Mainpage from './pages/Mainpage';
import { Route, Link, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Route path="/" component={Mainpage} exact={true} />
    </>
  );
};

export default App;
