import React, { useEffect } from 'react';
import VideoRoomComponent from '../components/study/components/VideoRoomComponent';
import registerServiceWorker from '../components/study/registerServiceWorker';
import { useSelector } from 'react-redux';

const StudyPage = () => {
  const { user, loading } = useSelector(({ user, loading }) => ({
    user: user,
    loading: loading['user/CHECK'],
  }));

  // useEffect(() => {
  //   {
  //     !loading && user && user.user.status === 'success' && console.log(user);
  //   }
  // }, [loading, user]);
  return (
    <div>
      {/* {!loading && user && user.user.status === 'success' && (
        <VideoRoomComponent
          mail={user.mail}
          user={user.user.data.name}
          image={user.user.data.image}
        />
      )} */}
      <VideoRoomComponent />
    </div>
  );
};

registerServiceWorker();
export default StudyPage;
