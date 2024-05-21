import React, { useState } from 'react';
import style from './ChattingListPage.module.css';
import { useSocket } from '../../utils/socketContext';
import { useNavigate } from 'react-router-dom';

const ChattingRooms = ({
  chatroomId,
  title,
  tags,
  time,
  userCount,
  isRamification,
}) => {
  const socket = useSocket();
  const navigate = useNavigate();

  console.log('isRamification', isRamification);

  const handleRoomClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (isRamification) {
        socket.send(JSON.stringify({ type: 'JOIN', data: chatroomId }));
        navigate(`/chat/chatRoom/${chatroomId}`);
      } else {
        socket.send(JSON.stringify({ type: 'READ', data: chatroomId }));
        navigate(`/chat/chatRoom/${chatroomId}`);
      }
    } else {
      alert('WebSocket is not connected.');
    }
  };

  return (
    <li className={style.roomBox}>
      <span className={style.roomTitle} onClick={handleRoomClick}>
        {title}
      </span>
      <span className={style.roomTime}>{time}</span>
      <span className={style.roomTag}>
        {tags?.map((tag, idx) => (
          <span key={idx}> #{tag}</span>
        ))}
      </span>
      <div className={style.participants}>👥 {userCount}</div>
    </li>
  );
};
export default ChattingRooms;
