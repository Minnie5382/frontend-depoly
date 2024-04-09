import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';

const ChatroomsList = ({ chatrooms, query }) => {
  return (
    <div>
      <h2>'{query}' 을 주제로 한 채팅방</h2>
      <div className={style.chatroomsContainer}>
        {chatrooms.map((chatroom) => (
          <Link
            to={`/api/chat/${chatroom.chatRoomId}/join`}
            key={chatroom.id}
            className={style.chatroom}
          >
            <span className={style.chatroomTitle}>{chatroom.chatRoomName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatroomsList;
