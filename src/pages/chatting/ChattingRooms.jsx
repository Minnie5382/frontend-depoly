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

  const handleRoomClick = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (isRamification) {
        navigate(`/chat/chatRoom/${chatroomId}`, { state: isRamification });
      } else {
        navigate(`/chat/chatRoom/${chatroomId}`, { state: isRamification });
      }
    } else {
      alert('WebSocket is not connected.');
    }
  };

  return (
    <li className={style.roomBox}>
      <div className={style.roomInerBox}>
        <span className={style.roomTitle} onClick={handleRoomClick}>
          {title}
        </span>
        <span className={style.roomTime}>{time}</span>
        <span className={style.roomTag}>
          {tags?.map((tag, idx) => (
            <span key={idx}> #{tag}</span>
          ))}
        </span>
      </div>
      {isRamification ? (
        <div className={style.participants}>👥 {userCount}</div>
      ) : (
        <></>
      )}
    </li>
  );
};
export default ChattingRooms;
