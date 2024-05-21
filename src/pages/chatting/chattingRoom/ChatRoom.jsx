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

  console.log('location.state', location.state);
  const onClose = location.state;
  //location.state === 'close'

  useEffect(() => {
    const handleMessage = event => {
      const response = JSON.parse(event.data);
      //response.type === "READ" 종료된 채팅방입니다 글씨 띄워줌 인풋없애기
      if (response.type === 'JOIN' || response.type === 'READ') {
        const chatLogs = response?.data?.chatLogDTOList || [];
        const newMessages = chatLogs.map(log => ({
          nickname: log.nickname,
          content: log.content,
          timeStamp: log.timestamp?.slice(11, 16),
        }));
        setMessages(newMessages);
        console.log('채팅이 연결되고 이전 채팅 데이터 출력', chatLogs);

        const roomInfo = response.data?.chatroomBriefDTO || [];
        setChatRoomInfo({
          title: roomInfo.title,
          tags: roomInfo.tags,
          closed: `${roomInfo.closedAt?.slice(
            0,
            10
          )} ${roomInfo.closedAt?.slice(11, 16)}`,
        });
        console.log('방 이름, 태그, ', roomInfo);

        const userList = response?.data?.joinedChatUserDTOList || [];
        const newUsers = userList.map(user => ({
          nickname: user.nickname,
          level: user.level,
          userId: user.userId,
          isBad: user.isBad,
          isCertified: user.isCertified,
        }));
        setUserListData(newUsers);
        console.log('유저 리스트', userList);
        if (response.type === 'READ') {
        }
      }
      // else if (response.type === 'READ') {
      //   console.log('종료된 채팅방 ',response?.data);
      // }
      else if (response.type === 'SEND') {
        console.log('채팅이 실시간으로 오는 영역', response.data);
        const newMessage = {
          nickname: response.data.nickname,
          content: response.data.content,
          timeStamp: response.data.timestamp.slice(11, 16),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        scrollToBottom();
      } else if (response.type === 'COME') {
        console.log('서버 알림 입장', response.data);
        const newData = response.data;
        const newMessage = {
          nickname: '[SERVER]',
          content: `[notice] : ${newData.nickname} 님이 입장하셨습니다.`,
          timeStamp: new Date().toTimeString().slice(0, 5),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
        //유저가 새로들어오면 리스트에 추가
        const newUsers = {
          nickname: newData.nickname,
          level: newData.level,
          userId: newData.userId,
          isBad: newData.isBad,
          isCertified: newData.isCertified,
        };
        setUserListData(prev => [...prev, newUsers]);

        scrollToBottom();
      } else if (response.type === 'LEAVE') {
        console.log('서버 알림 퇴장', response.data);
        const newMessage = {
          nickname: '[SERVER]',
          content: `[notice] : ${response.data} 님이 퇴장하셨습니다.`,
          timeStamp: new Date().toTimeString().slice(0, 5),
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);

        const targetName = response.data;
        setUserListData(prevUserList =>
          prevUserList.filter(user => user.nickname !== targetName)
        );
        scrollToBottom();
      } else if (response.type === 'QUIT') {
        window.location.reload();
        console.log(response.data);
      } else if (response.type === 'ERROR' && response.code === 403) {
        const isConfirmed = window.confirm(
          '로그인이 되어있지 않습니다. 로그인 하시겠습니까?'
        );
        console.log('룸에러', response.code);
        if (isConfirmed) {
          navigate('/signin');
        } else {
          navigate('/');
        }
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
  }, [socket, messages]);

  console.log('messages', messages);

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
    const handleBeforeUnload = event => {
      event.preventDefault();
      // 경고 메시지를 표시 (일부 브라우저에서는 이 설정이 필요할 수 있습니다)
      event.returnValue = '';
      alert('세션이 끊겼습니다.');
      // 여기서 특정 페이지로 이동
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

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const listOpen = Boolean(anchorEl);

  const listClose = () => {
    setAnchorEl(null);
  };

  const returnChatList = () => {
    socket.send(
      JSON.stringify({
        type: 'EXIT',
        data: params.roomId,
      })
    );
    navigate('/chat');
  };

  const onKeyEnter = e => {
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
            {userListData.length === 0 ? (
              <span className={style.close}>종료된 채팅방입니다.</span>
            ) : (
              <></>
            )}

            <span className={style.tags}>
              {chatRoomInfo?.tags?.map(tag => ' #' + tag)}
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
                    <label>{data.nickname}</label>
                    <div className={style.othersChat}>{data.content}</div>
                  </div>
                ) : (
                  <div className={style.myChatBox} key={idx}>
                    <div className={style.myChat}>{data.content}</div>
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
                type="text"
                className={style.chatInput}
                value={message}
                onChange={e => setMessage(e.target.value)}
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
      <ChatReportModal isOpen={open} onClose={closeModal} />
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.Popper + 1 }}
        open={listOpen}
        onClick={listClose}
      >
        <Popper
          open={listOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
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
            />
          </Box>
        </Popper>
      </Backdrop>
    </div>
  );
};
export default ChattingRoomPage;
