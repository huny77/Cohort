import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Navbar from './components/common/Navbar';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';

const App = () => {
  const { mail } = useSelector(({ user }) => ({
    mail: user.mail,
  }));

  const AdminRoute = (props) => {
    if (mail) return <Route {...props} />;
    return <Redirect to="/" />;
  };

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Route path="/" component={LandingPage} exact={true} />
      <Route path="/post" component={PostListPage} exact={true} />
      <Route path="/post/:post_id" component={PostPage} />
      <AdminRoute path="/write" component={WritePage} />
    </>
  );
};

export default App;
