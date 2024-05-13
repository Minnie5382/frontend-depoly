import React, { useState } from 'react';
import style from './ChattingListPage.module.css';
import ChatCreateModal from './ChatCreateModal';

const ChattingListPage = () => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className={style.container}>
      <div className={style.chatContainer}>
        <div className={style.chatBox}>
          <div className={style.tableList}>
            <button>진행중</button>
            <button>완료</button>
          </div>
          <button className={style.creatBtn} onClick={openModal}>
            채팅방 생성하기
          </button>
        </div>
        {/* map */}
        <div className={style.chattingRoom}>
          <div className={style.roomBox}>
            <button>캡틴 아메리카는 찐따다.</button>
            <h6>2024-04-03 17:00 ~ 2024-04-04 17:00</h6>
            <h5>#시빌워 #캡틴아메리카</h5>
            <div className={style.participants}>👥 1005</div>
          </div>
          <div className={style.roomBox}>
            <button>캡틴 아메리카는 찐따다.</button>
            <h6>2024-04-03 17:00 ~ 2024-04-04 17:00</h6>
            <h5>#시빌워 #캡틴아메리카 #캡틴</h5>

            <div className={style.participants}>👥 5</div>
          </div>
          <div className={style.roomBox}>
            <button>캡틴 아메리카는 찐따다.</button>
            <h6>2024-04-03 17:00 ~ 2024-04-04 17:00</h6>
            <h5>#시빌워 #캡틴아메리카</h5>

            <div className={style.participants}>👥 100</div>
          </div>
        </div>
      </div>
      <ChatCreateModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};
export default ChattingListPage;
