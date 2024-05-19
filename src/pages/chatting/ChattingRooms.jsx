import React, { useState } from 'react';
import style from './ChattingListPage.module.css';
import { useSocket } from '../../utils/socketContext';
import { useNavigate } from 'react-router-dom';

const ChattingRooms = ({
  chatroomId,
  title,
  tags,
  createdAt,
  closedAt,
  userCount,
}) => {
  console.log(chatroomId, title, tags, createdAt, closedAt, userCount);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleRoomClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'JOIN', data: chatroomId }));
      navigate(`/chat/chatRoom/${chatroomId}`);
    } else {
      alert('WebSocket is not connected.');
    }
  };

  const time =
    createdAt?.slice(0, 10) +
    ' ' +
    createdAt?.slice(11, 16) +
    '~' +
    closedAt?.slice(0, 10) +
    ' ' +
    closedAt?.slice(11, 16);

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
