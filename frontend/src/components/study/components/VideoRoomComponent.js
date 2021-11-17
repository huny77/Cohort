import React, { Component } from 'react';
import axios from 'axios';
import './VideoRoomComponent.css';
import { OpenVidu } from 'openvidu-browser';
import StreamComponent from './stream/StreamComponent';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import ChatComponent from './chat/ChatComponent';
import styled from 'styled-components';

import OpenViduLayout from '../layout/openvidu-layout';
import UserModel from '../models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Input,
  Alert,
  Snackbar,
  NativeSelect,
} from '@mui/material';
import { codeRun } from '../../../lib/api/run';
import { writePost } from '../../../lib/api/posts';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MuiAlert from '@mui/material/Alert';

const StudyDiv = styled.div`
  position: absolute;
  bottom: 0;
  /* left: 0; */
  right: 0;
  height: 100%;
  width: 50%;
  /* z-index: 999998; */
`;

var localUser = new UserModel();

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    this.OPENVIDU_SERVER_URL = 'https://k5b104.p.ssafy.io';
    this.OPENVIDU_SERVER_SECRET = '1234';
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : 'Sessionbc';
    let userName = this.props.user
      ? this.props.user
      : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    // let userName = this.props.user
    //   ? this.props.user
    //   : 'OpenVidu_User' + Math.floor(Math.random() * 100);
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: 'none',
      body: '',
      language: 'python',
      input: '',
      output: '',
      title: '',
      site: 'BOJ',
      open: false,
      alertOpen: false,
      validOpen: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.modalHandleOpen = this.modalHandleOpen.bind(this);
    this.modalHandleClose = this.modalHandleClose.bind(this);
    this.alertHandleClose = this.alertHandleClose.bind(this);
    this.validHandleClose = this.validHandleClose.bind(this);
  }

  modalHandleOpen() {
    this.setState({
      open: true,
    });
  }
  modalHandleClose() {
    this.setState({
      open: false,
    });
  }

  alertHandleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      alertOpen: false,
    });
  }
  validHandleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      validOpen: false,
    });
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: 'OV_big', // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById('layout'),
      openViduLayoutOptions,
    );
    window.addEventListener('beforeunload', this.onbeforeunload);
    window.addEventListener('resize', this.updateLayout);
    window.addEventListener('resize', this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
    window.removeEventListener('resize', this.updateLayout);
    window.removeEventListener('resize', this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
        var mySession = this.state.session;
        mySession.on('signal:body', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                body: event.data,
              });
              console.log('저장이됩니까');
            }
          }
        });
        mySession.on('signal:input', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                input: event.data,
              });
              console.log('저장이됩니까');
            }
          }
        });
        mySession.on('signal:output', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                output: event.data,
              });
              console.log('저장이됩니까');
            }
          }
        });
        mySession.on('signal:site', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                site: event.data,
              });
              console.log('저장이됩니까');
              console.log(this.state.site);
            }
          }
        });
        mySession.on('signal:language', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                language: event.data,
              });
              console.log('저장이됩니까');
              console.log(this.state.language);
            }
          }
        });
        mySession.on('signal:title', (event) => {
          if (
            this.state.session.connection.connectionId !==
            event.from.connectionId
          ) {
            if (this.state.body !== event.data) {
              this.setState({
                title: event.data,
              });
              console.log('저장이됩니까');
              console.log(this.state.title);
            }
          }
        });
      },
    );
  }

  connectToSession() {
    if (this.props.token !== undefined) {
      console.log('token received: ', this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          console.log(token);
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              messgae: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            'There was an error getting the token:',
            error.code,
            error.message,
          );
          alert('There was an error getting the token:', error.message);
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert('There was an error connecting to the session:', error.message);
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
      });
  }

  connectWebCam() {
    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: '640x480',
      frameRate: 30,
      insertMode: 'APPEND',
    });

    if (this.state.session.capabilities.publish) {
      publisher.on('accessAllowed', () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState({ localUser: localUser }, () => {
      this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
        this.updateLayout();
        publisher.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
    });
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
        this.updateLayout();
      },
    );
  }
  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: 'SessionA',
      myUserName: 'OpenVidu_User' + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream,
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    this.state.session.on('streamCreated', (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on('streamPlaying', (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          'custom-class',
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType('remote');
      const nickname = event.stream.connection.data.split('%')[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on('streamDestroyed', (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on('signal:userChanged', (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log('EVENTO REMOTE: ', event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen(),
      );
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: 'userChanged',
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById('container');
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
          alert('Your browser does not support screen sharing');
        } else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
          alert('You need to enable screen sharing extension');
        } else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
          alert('You need to choose a window or application to share');
        }
      },
    );

    publisher.once('accessAllowed', () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on('streamPlaying', () => {
      this.updateLayout();
      publisher.videos[0].video.parentElement.classList.remove('custom-class');
    });
  }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }

  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    const openviduLayoutOptions = {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: isScreenShared,
      bigClass: 'OV_big',
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      animate: true,
    };
    this.layout.setLayoutOptions(openviduLayoutOptions);
    this.updateLayout();
  }

  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === 'none' ? 'block' : 'none';
    }
    if (display === 'block') {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log('chat', display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === 'none',
    });
  }
  checkSize() {
    if (
      document.getElementById('layout').offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat('none');
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById('layout').offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };
    const { mail, user, image } = this.props;

    return (
      <Box>
        <div className="container" id="container">
          <ToolbarComponent
            sessionId={mySessionId}
            user={localUser}
            showNotification={this.state.messageReceived}
            camStatusChanged={this.camStatusChanged}
            micStatusChanged={this.micStatusChanged}
            screenShare={this.screenShare}
            stopScreenShare={this.stopScreenShare}
            toggleFullscreen={this.toggleFullscreen}
            leaveSession={this.leaveSession}
            toggleChat={this.toggleChat}
          />

          <DialogExtensionComponent
            showDialog={this.state.showExtensionDialog}
            cancelClicked={this.closeDialogExtension}
          />

          <div
            id="layout"
            className="bounds"
            style={{
              position: 'absolute',
              /* margin: auto; */
              bottom: 0,
              left: 0,
              /* right: 0; */
              height: '100%',
              width: '50%',
              // zIndex: 999998,
            }}
          >
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className="OT_root OT_publisher custom-class"
                  id="localUser"
                >
                  <StreamComponent
                    user={localUser}
                    handleNickname={this.nicknameChanged}
                  />
                </div>
              )}
            {this.state.subscribers.map((sub, i) => (
              <div
                key={i}
                className="OT_root OT_publisher custom-class"
                id="remoteUsers"
              >
                <StreamComponent
                  user={sub}
                  streamId={sub.streamManager.stream.streamId}
                />
              </div>
            ))}
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div
                  className="OT_root OT_publisher custom-class"
                  style={chatDisplay}
                >
                  <ChatComponent
                    user={localUser}
                    chatDisplay={this.state.chatDisplay}
                    close={this.toggleChat}
                    messageReceived={this.checkNotification}
                  />
                </div>
              )}
          </div>
        </div>

        <StudyDiv>
          <Box sx={{ display: 'flex' }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="select-language">
                Language
              </InputLabel>
              <NativeSelect
                defaultValue={'python'}
                value={this.state.language}
                inputProps={{
                  name: 'language',
                  id: 'select-language',
                }}
                onChange={(e) => {
                  this.setState({
                    language: e.target.value,
                  });
                  this.state.session
                    .signal({
                      data: e.target.value, // Any string (optional)
                      to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                      type: 'language', // The type of message (optional)
                    })
                    .then(() => {
                      console.log('Message successfully sent');
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <option value={'python'}>python</option>
                <option value={'java'}>java</option>
                <option value={'cpp'}>cpp</option>
                <option value={'c'}>c</option>
              </NativeSelect>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="select-site">
                Site
              </InputLabel>
              <NativeSelect
                defaultValue={'BOJ'}
                value={this.state.site}
                inputProps={{
                  name: 'site',
                  id: 'select-site',
                }}
                onChange={(e) => {
                  this.setState({
                    site: e.target.value,
                  });
                  this.state.session
                    .signal({
                      data: e.target.value, // Any string (optional)
                      to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                      type: 'site', // The type of message (optional)
                    })
                    .then(() => {
                      console.log('Message successfully sent');
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }}
              >
                <option value={'BOJ'}>BOJ</option>
                <option value={'programmers'}>programmers</option>
                <option value={'goorm'}>goorm</option>
                <option value={'SWEA'}>SWEA</option>
                <option value={'HackerRank'}>HackerRank</option>
                <option value={'LeetCode'}>LeetCode</option>
              </NativeSelect>
            </FormControl>
            <TextField
              variant="outlined"
              label="title"
              value={this.state.title}
              onChange={(e) => {
                this.setState({
                  title: e.target.value,
                });
                this.state.session
                  .signal({
                    data: e.target.value, // Any string (optional)
                    to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                    type: 'title', // The type of message (optional)
                  })
                  .then(() => {
                    console.log('Message successfully sent');
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                this.modalHandleOpen();
              }}
            >
              게시판에 저장
            </Button>
          </Box>
          <Editor
            height="50vh"
            language={this.state.language}
            value={this.state.body}
            onChange={(e) => {
              this.setState({
                body: e,
              });
              this.state.session
                .signal({
                  data: e, // Any string (optional)
                  to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                  type: 'body', // The type of message (optional)
                })
                .then(() => {
                  console.log('Message successfully sent');
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            theme="vs-dark" // light
            // options={{ readOnly: 'true' }}
          />

          <button
            onClick={() => {
              if (this.state.body) {
                if (this.state.language === 'python') {
                  codeRun({
                    body: this.state.body,
                    language: 'python3',
                    input: this.state.input,
                  })
                    .then((response) => {
                      console.log(response);
                      this.setState({
                        output: response.data.output,
                      });
                      this.state.session
                        .signal({
                          data: response.data.output, // Any string (optional)
                          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                          type: 'output', // The type of message (optional)
                        })
                        .then(() => {
                          console.log('Message successfully sent');
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                } else {
                  codeRun({
                    body: this.state.body,
                    language: this.state.language,
                    input: this.state.input,
                  })
                    .then((response) => {
                      console.log(response);
                      this.setState({
                        output: response.data.output,
                      });
                      this.state.session
                        .signal({
                          data: response.data.output, // Any string (optional)
                          to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                          type: 'output', // The type of message (optional)
                        })
                        .then(() => {
                          console.log('Message successfully sent');
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                }
              }
            }}
          >
            코드실행
          </button>

          <div>인풋</div>
          <Editor
            height="15vh"
            language={this.state.language}
            value={this.state.input}
            onChange={(e) => {
              this.setState({
                input: e,
              });
              this.state.session
                .signal({
                  data: e, // Any string (optional)
                  to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
                  type: 'input', // The type of message (optional)
                })
                .then(() => {
                  console.log('Message successfully sent');
                })
                .catch((error) => {
                  console.error(error);
                });
            }}
            theme="vs-dark" // light
            // options={{ readOnly: 'true' }}
          />
          <div>아웃풋</div>
          <Editor
            height="15vh"
            language={this.state.language}
            value={this.state.output}
            theme="vs-dark" // light
            options={{ readOnly: 'true' }}
          />
        </StudyDiv>
        {/* 게시판 저장 모달 */}
        <div>
          <Modal
            keepMounted
            open={this.state.open}
            onClose={this.modalHandleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                zIndex: 999999,
              }}
            >
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  게시판에 코드 저장하기
                </Typography>

                <Button variant="outlined" onClick={this.modalHandleClose}>
                  취소
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (!this.state.title || !this.state.body) {
                      this.setState({
                        validOpen: true,
                      });
                    } else {
                      writePost({
                        title: this.state.title,
                        language: this.state.language,
                        content: `${this.state.body}`,
                        site: this.state.site,
                        mail: mail,
                      })
                        .then((response) => {
                          if (response.data.status === 'success') {
                            this.setState({
                              alertOpen: true,
                            });
                            this.modalHandleClose();
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }
                  }}
                >
                  저장
                </Button>
              </>
            </Box>
          </Modal>
        </div>
        <Snackbar
          open={this.state.alertOpen}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          autoHideDuration={2000}
          onClose={this.alertHandleClose}
        >
          <MuiAlert
            onClose={this.alertHandleClose}
            variant="filled"
            severity="success"
            style={{ backgroundColor: '#00c853' }}
          >
            게시글 저장에 성공했습니다.
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.validOpen}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          autoHideDuration={2000}
          onClose={this.validHandleClose}
        >
          <MuiAlert
            onClose={this.validHandleClose}
            variant="filled"
            severity="warning"
            style={{ backgroundColor: '#f44336' }}
          >
            제목과 코드를 입력해주세요.
          </MuiAlert>
        </Snackbar>
      </Box>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId),
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                this.OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + this.OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
export default VideoRoomComponent;
