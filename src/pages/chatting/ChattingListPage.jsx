import React, { useState, useEffect } from 'react';
import style from './ChattingListPage.module.css';
import ChatCreateModal from './ChatCreateModal';
import { useSocket } from '../../utils/socketContext';
import ChattingRooms from './ChattingRooms';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const ChattingListPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  const [isRamification, setIsRamification] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = () => {
    if (!socket) return;

    const onSocketReady = () => {
      socket.send(
        JSON.stringify({
          type: 'LIST',
          data: isRamification,
          path: 'localhost:3000/chat',
        })
      );
    };

    if (socket.readyState === WebSocket.OPEN) {
      // setIsLoading(true);
      onSocketReady();
    } else {
      socket.addEventListener('open', onSocketReady);
    }
  };

  const handleRoomList = event => {
    // setIsLoading(true);
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
      setRooms(prev => [newRoom, ...prev]);
    } else if (response.type === 'CLOSECHAT') {
      const targetId = response.data;
      setRooms(prevRooms =>
        prevRooms.filter(room => room.chatroomId !== targetId)
      );
    } else if (response.type === 'JOINCHAT') {
      const targetId = response.data;
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.chatroomId === targetId) {
            return { ...room, userCount: room.userCount + 1 };
          }
          return room;
        });
      });
    } else if (response.type === 'EXITCHAT') {
      const targetId = response.data;
      setRooms(prevRooms => {
        return prevRooms.map(room => {
          if (room.chatroomId === targetId) {
            return { ...room, userCount: room.userCount - 1 };
          }
          return room;
        });
      });
    } else if (response.type === 'QUIT') {
      // window.location.reload();
      console.log(response.data);
    }
    // else if (response.type === 'ERROR') {
    // console.error('리스트 에러:', response.data);
    // if (response.data.message === '채팅방이 존재하지 않습니다.') {
    //   // window.location.reload();
    //   console.log('Error:', response.data.message);
    // }
    // }
    // setIsLoading(false);
  };

  // const sendMessage = () => {
  //   socket.send(
  //     JSON.stringify({
  //       type: 'CLOSE',
  //       data: 19,
  //     })
  //   );
  // };

  useEffect(() => {
    fetchRooms();
  }, [socket, isRamification]);

  useEffect(() => {
    if (!socket) return;
    socket.addEventListener('message', handleRoomList);
    return () => {
      socket.removeEventListener('message', handleRoomList);
    };
  }, [socket]);

  const openModal = () => {
    setIsOpen(true);
  };

  const clickOnTap = () => {
    setIsRamification(true);
  };

  const clickClosedTap = () => {
    setIsRamification(false);
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

        <div className={style.chattingRoom}>
          {/* {isLoading ? (
            <Box sx={{ width: '100%', height: '100%' }}>
              <Skeleton
                animation="wave"
                width={'100%'}
                height={'150px'}
                sx={{ backgroundColor: 'rgb(255 255 255 / 5%)' }}
              />
            </Box>
          ) : */}
          {rooms?.length !== 0 ? (
            rooms?.map((data, idx) => (
              <ChattingRooms
                key={idx}
                {...data}
                isRamification={isRamification}
              />
            ))
          ) : (
            <></>
            // <div className={style.none}>개설된 방이 없습니다.</div>
          )}
        </div>
      </div>
      <ChatCreateModal isOpen={isOpen} setOpen={setIsOpen} />
    </div>
  );
};

export default ChattingListPage;
