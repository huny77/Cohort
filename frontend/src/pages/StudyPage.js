import React, { useEffect } from 'react';
import VideoRoomComponent from '../components/study/components/VideoRoomComponent';
import registerServiceWorker from '../components/study/registerServiceWorker';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const StudyPage = () => {
  const { user, loading, session } = useSelector(
    ({ user, loading, study }) => ({
      user: user,
      loading: loading['user/CHECK'],
      session: study.sessionCode,
    }),
  );

  // 강제로 접속 막기
  if (!session) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Helmet>
        <title>Cohort - 스터디룸</title>
      </Helmet>
      <div>
        {!loading && user && user.user.status === 'success' && (
          <VideoRoomComponent
            // mail={user.mail}
            // sessionName={user.mail.substring(0, parseInt(user.mail.length) - 10)}
            sessionName={session}
            user={user.user.data.name}
            image={user.user.data.image}
            mail={user.mail}
          />
        )}
        {/* <VideoRoomComponent /> */}
      </div>
    </>
  );
};

registerServiceWorker();
export default StudyPage;
