import React, { useState, useEffect } from 'react';
import style from './ChattingListPage.module.css';
import ChatCreateModal from './ChatCreateModal';
import { useSocket } from '../../utils/socketContext';
import ChattingRooms from './ChattingRooms';

const ChattingListPage = () => {
  const [isOpen, setOpen] = useState(false);
  const socket = useSocket();
  const [rooms, setRooms] = useState([]);
  // const [rooms, setRooms] = useState([
  //   {
  //     chatroomId: 1,
  //     title: '제목',
  //     tags: ['태그', '태그당', '태그야'],
  //     createdAt: '2024-05-17T05:01:04.334186',
  //     closedAt: '2024-05-18T05:01:04.334186',
  //     userCount: 30,
  //   },
  //   {
  //     chatroomId: 2,
  //     title: '제목',
  //     tags: ['태그', '태그당', '태그야'],
  //     createdAt: '2024-05-17T05:01:04.334186',
  //     closedAt: '2024-05-18T05:01:04.334186',
  //     userCount: 30,
  //   },
  // ]);
  const [progress, setProgress] = useState(true);

  //유저 없으면 로그인 알럿띄우기

  useEffect(() => {
    const fetchRooms = () => {
      console.log('로딩중');
      if (!socket) return;
      console.log(socket);

      //연결
      const onSocketReady = () => {
        socket.send(
          JSON.stringify({
            type: 'LIST',
            data: progress,
            path: 'localhost:3000/chat',
          })
        );
      };

      if (socket.readyState === WebSocket.OPEN) {
        onSocketReady();
      } else {
        socket.addEventListener('open', onSocketReady);
      }

      const handleRoomList = event => {
        try {
          const response = JSON.parse(event.data);
          const roomIds = response?.data?.result?.list;
          console.log(roomIds);
          setRooms(roomIds);
        } catch (error) {
          setRooms([]);
        }
      };

      socket.addEventListener('message', handleRoomList);
      return () => {
        socket.removeEventListener('message', handleRoomList);
        socket.removeEventListener('open', onSocketReady);
      };
    };

    fetchRooms();
    console.log('로딩끝');
  }, [socket, progress]);

  const openModal = () => {
    setOpen(true);
  };

  const clickOnTap = () => {
    setProgress(true);
    console.log('진행중탭');
  };
  const clickClosedTap = () => {
    setProgress(false);
    console.log('완료중탭');
  };
  // console.log(rooms);
  // console.log(rooms.length);

  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <div className={style.chatBox}>
          <div className={style.tableList} color="#333">
            <button
              className={progress ? style.selectBtn : style.noneSelectBtn}
              onClick={clickOnTap}
            >
              진행중
            </button>
            <button
              className={progress ? style.noneSelectBtn : style.selectBtn}
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
          {rooms?.length !== 0 ? (
            rooms?.map(data => (
              <ChattingRooms key={data.chatroomId} {...data} />
            ))
          ) : (
            <div className={style.none}>개설된 방이 없습니다.</div>
          )}
        </div>
      </div>

      <ChatCreateModal isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};
export default ChattingListPage;
