import React from 'react';
import { Link } from 'react-router-dom';
import style from './Search.module.css';

const ChatroomsList = ({ chatrooms, query, isLoading, error }) => {
  return (
    <div>
      <h2>'{query}' 을 주제로 한 채팅방</h2>
      <div className={style.chatroomsContainer}>
        {chatrooms?.result?.length > 0 ? (
          chatrooms?.result.map((chatroom) => (
            <Link
              to={`/chat/${chatroom.chatRoomId}`}
              key={chatroom.chatRoomId}
              className={style.chatroom}
            >
              <span className={style.chatroomTitle}>
                {chatroom.chatRoomName}
              </span>
            </Link>
          ))
        ) : (
          <div>'{query}'로 검색한 채팅방이 존재하지 않습니다!</div>
        )}
      </div>
      {isLoading && <div className={style.statusMessage}>로딩중...</div>}
      {error && (
        <div className={style.statusMessage}>
          오류가 발생했습니다!: {error.message}
        </div>
      )}
    </div>
  );
};

export default ChatroomsList;
