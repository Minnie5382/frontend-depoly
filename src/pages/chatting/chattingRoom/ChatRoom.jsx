import React, { useState, useEffect, useRef } from 'react';
import style from './ChatRoom.module.css';
import ChatReportModal from './ChatReportModal';
import ChatParticipantList from '../ChatParticipantList';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Report from '../../../assets/free-icon-siren-763421.png';
import People from '../../../assets/people.png';
import Backdrop from '@mui/material/Backdrop';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSocket } from '../../../utils/socketContext';
import { useUser } from '../../../utils/UserContext';

const ChattingRoomPage = () => {
  const params = useParams();
  const socket = useSocket();
  const { user } = useUser();
  const [chatRoomInfo, setChatRoomInfo] = useState({
    title: '',
    tags: [],
    closeed: '',
  });
  const [message, setMessage] = useState(''); //인풋 메시지
  const [messages, setMessages] = useState([]); //메시지 전부
  const [userListData, setUserListData] = useState([]);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [userReportId, setUserReportId] = useState('');
  const isOpenClose = location.state;

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const messageType = isOpenClose ? 'JOIN' : 'READ';
      socket.send(JSON.stringify({ type: messageType, data: params.roomId }));
    } else {
      alert('WebSocket is not connected.');
    }

    const handleMessage = (event) => {
      const response = JSON.parse(event.data);
      switch (response.type) {
        case 'JOIN':
        case 'READ':
          handleJoinReadMessage(response);
          break;
        case 'SEND':
          handleSendMessage(response);
          break;
        case 'COME':
          handleUserJoinMessage(response);
          break;
        case 'LEAVE':
          handleUserLeaveMessage(response);
          break;
        case 'QUIT':
          handleQuitMessage(response);
          break;
        case 'ERROR':
          handleError(response);
          break;
        default:
          break;
      }
    };
    if (socket) {
      socket.addEventListener('message', handleMessage);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleMessage);
      }
    };
  }, [socket, isOpenClose]);

  const handleJoinReadMessage = (response) => {
    const chatLogs = response?.data?.chatLogDTOList || [];
    const newMessages = chatLogs.map((log) => ({
      nickname: log.nickname,
      content: log.content,
      timeStamp: log.timestamp?.slice(11, 16),
    }));
    setMessages(newMessages);

    const roomInfo = response.data?.chatroomBriefDTO || [];
    setChatRoomInfo({
      title: roomInfo.title,
      tags: roomInfo.tags,
      closed: `${roomInfo.closedAt?.slice(0, 10)} ${roomInfo.closedAt?.slice(
        11,
        16
      )}`,
    });

    const userList = response?.data?.joinedChatUserDTOList || [];
    const newUsers = userList.map((user) => ({
      nickname: user.nickname,
      level: user.level,
      userId: user.userId,
      isBad: user.isBad,
      isCertified: user.isCertified,
    }));
    setUserListData(newUsers);
  };

  const handleSendMessage = (response) => {
    const newMessage = {
      nickname: response.data.nickname,
      content: response.data.content,
      timeStamp: response.data.timestamp.slice(11, 16),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    scrollToBottom();
  };

  const handleUserJoinMessage = (response) => {
    const newData = response.data;
    const newMessage = {
      nickname: '[SERVER]',
      content: `[notice] : ${newData.nickname} 님이 입장하셨습니다.`,
      timeStamp: new Date().toTimeString().slice(0, 5),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    //유저가 새로들어오면 리스트에 추가
    const newUsers = {
      nickname: newData.nickname,
      level: newData.level,
      userId: newData.userId,
      isBad: newData.isBad,
      isCertified: newData.isCertified,
    };
    setUserListData((prev) => [...prev, newUsers]);
  };

  const handleUserLeaveMessage = (response) => {
    const newMessage = {
      nickname: '[SERVER]',
      content: `[notice] : ${response.data} 님이 퇴장하셨습니다.`,
      timeStamp: new Date().toTimeString().slice(0, 5),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    const targetName = response.data;
    setUserListData((prevUserList) =>
      prevUserList.filter((user) => user.nickname !== targetName)
    );
    scrollToBottom();
  };

  const handleQuitMessage = (response) => {
    // window.location.reload();
  };

  const handleError = (response) => {
    if (response.data.message === '퇴장 상태가 아닙니다.') {
      roomExit();
    } else {
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
      alert('세션이 끊겼습니다.');
      window.location.href = '/chat';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.send(
        JSON.stringify({
          type: 'SEND',
          data: { chatroomId: params.roomId, message: message },
        })
      );
      setMessage('');
    }
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const listOpen = Boolean(anchorEl);

  const listClose = () => {
    setAnchorEl(null);
  };

  const roomExit = () => {
    socket.send(
      JSON.stringify({
        type: 'EXIT',
        data: params.roomId,
      })
    );
  };

  const returnChatList = () => {
    roomExit();
    navigate('/chat');
  };

  const onKeyEnter = (e) => {
    if (
      e.target.value.length !== 0 &&
      (e.key === 'Enter' || e.code === 'Enter')
    ) {
      e.preventDefault(); // 기본 동작 방지
      if (e.nativeEvent.isComposing === false) {
        sendMessage();
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <div className={style.chatTitleBox}>
          <div className={style.chatTitle}>
            <span className={style.title}>{chatRoomInfo.title}</span>
            {!isOpenClose ? (
              <span className={style.close}>종료된 채팅방입니다.</span>
            ) : (
              <></>
            )}

            <span className={style.tags}>
              {chatRoomInfo?.tags?.map((tag) => ' #' + tag)}
            </span>
          </div>
          <div className={style.btnBox}>
            {userListData.length !== 0 ? (
              <div>
                <button
                  className={style.participantListBtn}
                  onClick={handleClick}
                >
                  <img src={People} />
                </button>
                <button className={style.reportBtn} onClick={openModal}>
                  <img src={Report} />
                </button>
              </div>
            ) : (
              <div />
            )}

            <button className={style.returnBtn} onClick={returnChatList}>
              채팅방 목록으로 돌아가기
            </button>
          </div>
        </div>
        <div className={style.chatBox} ref={chatBoxRef}>
          <div
            className={style.chatBoxInner}
            style={
              userListData.length === 0
                ? { height: '72.5vh' }
                : { height: '65vh' }
            }
          >
            {messages.length > 0 ? (
              messages.map((data, idx) =>
                data.nickname === '[SERVER]' ? (
                  <div className={style.serverMessageBox} key={idx}>
                    <div className={style.serverMessage}>{data.content}</div>
                  </div>
                ) : data.nickname !== user.result.nickname ? (
                  <div className={style.othersChatBox} key={idx}>
                    <span className={style.othersChatNickname}>
                      {data.nickname}
                    </span>
                    <div className={style.othersChatInerBox}>
                      <div className={style.othersChat}>{data.content}</div>
                      <span className={style.othersChatTimeStamp}>
                        {data.timeStamp}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={style.myChatBox} key={idx}>
                    <div className={style.myChat}>{data.content}</div>
                    <span className={style.myChatTimeStamp}>
                      {data.timeStamp}
                    </span>
                  </div>
                )
              )
            ) : (
              <div className={style.noMessages}>메시지가 없습니다.</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {userListData.length !== 0 ? (
            <div className={style.chatInputBox}>
              <input
                type='text'
                className={style.chatInput}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onKeyEnter}
              />
              <button className={style.sandBtn} onClick={sendMessage}>
                ➤
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ChatReportModal
        isOpen={open}
        onClose={closeModal}
        userListData={userListData}
        userReportId={userReportId}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.Popper + 1 }}
        open={listOpen}
        onClick={listClose}
      >
        <Popper
          open={listOpen}
          anchorEl={anchorEl}
          placement='bottom-start'
          sx={{
            overflow: 'auto',
            height: 225,
            //height: 280px;
            // max-height: 280px;
            backgroundColor: '#1f262e',
            borderRadius: '5px',
            border: '1px solid #333',
          }}
        >
          <Box
            sx={{
              border: 0,
              p: 0,
            }}
          >
            <ChatParticipantList
              setOpen={setOpen}
              userListData={userListData}
              roomExit={roomExit}
              setUserReportId={setUserReportId}
            />
          </Box>
        </Popper>
      </Backdrop>
    </div>
  );
};
export default ChattingRoomPage;
