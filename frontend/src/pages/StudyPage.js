import React from 'react';
import VideoRoomComponent from '../components/study/components/VideoRoomComponent';
import registerServiceWorker from '../components/study/registerServiceWorker';

const StudyPage = () => {
  return (
    <div>
      <VideoRoomComponent />
    </div>
  );
};

registerServiceWorker();
export default StudyPage;
