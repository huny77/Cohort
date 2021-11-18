import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LandingPage from './pages/LandingPage';
import Navbar from './components/common/Navbar';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import StudyPage from './pages/StudyPage';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <>
      <Helmet>
        <title>Cohort</title>
      </Helmet>
      <CssBaseline />
      <Navbar />
      <Route path="/" component={LandingPage} exact={true} />
      <Route path="/post" component={PostListPage} exact={true} />
      <Route path="/post/:post_id" component={PostPage} />
      <Route path="/write" component={WritePage} />
      <Route path="/study" component={StudyPage} />
    </>
  );
};

export default App;
