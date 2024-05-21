import React, { useState, useEffect } from 'react';
import style from './ChattingListPage.module.css';
import ChatCreateModal from './ChatCreateModal';
import { useSocket } from '../../utils/socketContext';
import ChattingRooms from './ChattingRooms';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ChattingListPage = () => {
  const [isOpen, setOpen] = useState(false);
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [isRamification, setIsRamification] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = () => {
    console.log('로딩중');
    if (!socket) return;
    console.log(socket);

    //연결
    const onSocketReady = () => {
      socket.send(
        JSON.stringify({
          type: 'LIST',
          data: isRamification,
          path: 'localhost:3000/chat',
        })
      );
    };

    // const readySocket = () => {
    //   var sessionData = {
    //     type: 'INIT',
    //     data: sessionStorage.getItem('browserSession'),
    //   };
    //   console.log();
    //   socket.send(JSON.stringify(sessionData));
    // };

    if (socket.readyState === WebSocket.OPEN) {
      setIsLoading(true);
      // readySocket();
      onSocketReady();
    } else {
      socket.addEventListener('open', onSocketReady);
    }
    setIsLoading(false);

    const handleRoomList = event => {
      setIsLoading(true);

      const response = JSON.parse(event.data);
      const roomLogsList = response.data?.result?.list || [];
      if (response.type === 'LIST') {
        const newRoom = roomLogsList.map(roomLogs => ({
          chatroomId: roomLogs.chatroomId,
          title: roomLogs.title,
          tags: roomLogs.tags,
          time:
            roomLogs.createdAt.slice(0, 10) +
            ' ' +
            roomLogs.createdAt.slice(11, 16) +
            ' ~ ' +
            roomLogs.closedAt.slice(0, 10) +
            ' ' +
            roomLogs.closedAt.slice(11, 16),
          userCount: roomLogs.userCount,
        }));
        setRooms(newRoom);
      } else if (response.type === 'NEWCHAT') {
        const newRoom = {
          chatroomId: response.data.chatroomId,
          title: response.data.title,
          tags: response.data.tags,
          time:
            response.data.createdAt.slice(0, 10) +
            ' ' +
            response.data.createdAt.slice(11, 16) +
            ' ~ ' +
            response.data.closedAt.slice(0, 10) +
            ' ' +
            response.data.closedAt.slice(11, 16),
          userCount: response.data.userCount,
        };
        setRooms(prev => [...prev, newRoom]);
      } else if (response.type === 'CLOSECHAT') {
        const targetId = response.data;
        setRooms(prevRooms =>
          prevRooms.filter(room => room.chatroomId !== targetId)
        );
      } else if (response.type === 'JOINCHAT') {
        const targetId = response.data;
        const updateCount = rooms.map(room =>
          room.chatroomId === targetId
            ? { ...room, userCount: room.userCount + 1 }
            : room
        );
        setRooms(updateCount);
      } else if (response.type === 'EXITCHAT') {
        const targetId = response.data;
        const updateCount = rooms.map(room =>
          room.chatroomId === targetId
            ? { ...room, userCount: room.userCount - 1 }
            : room
        );
        setRooms(updateCount);
      } else if (response.type === 'QUIT') {
        window.location.reload();
        console.log(response.data);
      }
      setIsLoading(false);
    };

    socket.addEventListener('message', handleRoomList);
    return () => {
      socket.removeEventListener('message', handleRoomList);
      socket.removeEventListener('open', onSocketReady);
    };
  };

  const sendMessage = () => {
    //채팅 완료시키는 버튼
    socket.send(
      JSON.stringify({
        type: 'CLOSE',
        data: 4,
      })
    );
  };

  useEffect(() => {
    fetchRooms();
    console.log('로딩끝');
  }, [socket, isRamification]);

  const openModal = () => {
    setOpen(true);
  };

  const clickOnTap = () => {
    setIsRamification(true);
    console.log('진행중탭');
  };
  const clickClosedTap = () => {
    setIsRamification(false);
    console.log('완료중탭');
  };

  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <div className={style.chatBox}>
          <div className={style.tableList} color="#333">
            <button
              className={isRamification ? style.selectBtn : style.noneSelectBtn}
              onClick={clickOnTap}
            >
              진행중
            </button>
            <button
              className={isRamification ? style.noneSelectBtn : style.selectBtn}
              onClick={clickClosedTap}
            >
              완료
            </button>
          </div>
          <button className={style.creatBtn} onClick={openModal}>
            채팅방 생성하기
          </button>
        </div>
        <button className={style.creatBtn} onClick={sendMessage}>
          하하하
        </button>
        <div className={style.chattingRoom}>
          {isLoading ? (
            <Box sx={{ width: '100%', height: '100%' }}>
              <Skeleton
                animation="wave"
                width={'100%'}
                height={'150px'}
                sx={{ backgroundColor: 'rgb(255 255 255 / 5%)' }}
              />
            </Box>
          ) : rooms?.length !== 0 ? (
            rooms?.map((data, idx) => (
              <ChattingRooms
                key={idx}
                {...data}
                isRamification={isRamification}
              />
            ))
          ) : (
            <div className={style.none}>개설된 방이 없습니다.</div>
          )}
        </div>
      </div>

      <ChatCreateModal
        isOpen={isOpen}
        setOpen={setOpen}
        fetchRooms={fetchRooms}
      />
    </div>
  );
};
export default ChattingListPage;
