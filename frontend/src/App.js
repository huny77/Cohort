import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Navbar from './components/common/Navbar';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Route path="/" component={LandingPage} exact={true} />
    </>
  );
};

export default App;
