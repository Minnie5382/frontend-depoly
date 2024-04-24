import React, { useState } from 'react';
import style from './ChatRoom.module.css';
import Header from '../../../components/header/Header';
import ChatReportModal from './ChatReportModal';
import ChatParticipantList from '../ChatParticipantList';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Report from '../../../assets/free-icon-siren-763421.png';
import People from '../../../assets/people.png';
import Backdrop from '@mui/material/Backdrop';

const ChattingRoomPage = () => {
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    console.log(event.currentTarget);
  };
  const listOpen = Boolean(anchorEl);

  const listClose = () => {
    setAnchorEl(null);
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
            <button className={style.participantListBtn} onClick={handleClick}>
              <img src={People} />
            </button>
            <button className={style.reportBtn} onClick={openModal}>
              <img src={Report} />
            </button>
            <button className={style.returnBtn}>
              채팅방 목록으로 돌아가기
            </button>
          </div>
        </div>
        <div className={style.chatBox}>
          <div className={style.chatBoxInner}>
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.Popper + 1 }}
        open={listOpen}
        onClick={listClose}
      >
        <Popper
          open={listOpen}
          anchorEl={anchorEl}
          placement="bottom-start"
          sx={{
            overflow: 'auto',
            height: 240,
            backgroundColor: '#1f262e',
            borderRadius: '5px',
            border: '1px solid #333',
          }}
        >
          <Box
            sx={{
              border: 0,
              p: 0,
            }}
          >
            <ChatParticipantList setOpen={setOpen} />
          </Box>
        </Popper>
      </Backdrop>
    </div>
  );
};
export default ChattingRoomPage;
