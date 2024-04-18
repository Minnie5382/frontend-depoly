import React, { useState } from 'react';
import style from './ChatRoom.module.css';
import Header from '../../../components/header/Header';
import ChatReportModal from './ChatReportModal';

const ChattingRoomPage = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const user = 'user1';
  return (
    <div className={style.container}>
      <Header />
      <div className={style.chatContainer}>
        <div className={style.chatTitleBox}>
          <div className={style.chatTitle}>
            <label>캡틴 아메리카는 찐따다.</label>
            <h5>#시빌워 #캡틴아메리카</h5>
          </div>
          <div className={style.btnBox}>
            <button className={style.reportBtn} onClick={openModal}>
              🚨
            </button>
            <button className={style.returnBtn}>
              채팅방 목록으로 돌아가기
            </button>
          </div>
        </div>
        <div className={style.chatBox}>
          {/* map */}
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>ㄴㅇㄴㅇㄴㅁㅇㅁㄴㅇ</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.myChatBox}>
            <div className={style.myChat}>아뉘나는말이쥐~</div>
          </div>
          <div className={style.othersChatBox}>
            <label>{user}</label>
            <div className={style.othersChat}>가나다</div>
          </div>
          <div className={style.chatInputBox}>
            <input
              type="text"
              className={style.chatInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className={style.sandBtn} type="submit">
              ➤
            </button>
          </div>
        </div>
      </div>
      <ChatReportModal isOpen={open} onClose={closeModal} />
    </div>
  );
};
export default ChattingRoomPage;
