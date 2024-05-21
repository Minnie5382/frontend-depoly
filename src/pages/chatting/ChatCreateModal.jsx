import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import style from './ChattingListPage.module.css';
import { useSocket } from '../../utils/socketContext';
import { useNavigate } from 'react-router-dom';

const ChatCreateModal = ({ isOpen, setOpen, fetchRooms }) => {
  const [title, setTitle] = useState('');
  const [tagText, setTagText] = useState('');
  const [tagList, setTagList] = useState([]);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const socket = useSocket();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState(0);

  const onClose = e => {
    e.preventDefault();
    setOpen(false);
    setTitle('');
    setTagText('');
    setTagList([]);
    fetchRooms(); // 모달이 닫힐 때 방 목록 갱신
  };

  const onKeyTag = e => {
    if (
      (e.target.value.length !== 0 && e.key === 'Enter') ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 32
    ) {
      if (e.nativeEvent.isComposing === false) {
        submittagText(e);
      }
    }
    if (
      e.target.value.length !== 0 &&
      e.target.value === ' ' &&
      (e.key === ' ' || e.key === 'Spacebar' || e.key === 32)
    ) {
      if (e.nativeEvent.isComposing === false) {
        submittagText(e);
      }
    }
  };

  const onKeyEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      if (e.target.value.length !== 0 && e.target === firstRef.current) {
        e.preventDefault(); // 기본 동작 방지
        secondRef.current.focus();
      }
    }
  };

  const submittagText = () => {
    if (tagText.trim() !== '') {
      setTagList([...tagList, tagText.trim()]);
      setTagText('');
    }
  };

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(tag => tag !== deleteTagItem);
    setTagList(filteredTagList);
  };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      width: '500px',
      height: 'auto',
      bgcolor: 'var(--background-color)',
      padding: '20px',
    },
  };

  const textFieldStyle = {
    bgcolor: 'var(--sub-color)',
    '& .MuiInputLabel-root': {
      color: 'var(--text-color)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--border-color)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--point-color)',
      },
    },
    '& .MuiInputBase-root': {
      color: 'var(--text-color)',
    },
    '& .MuiInputBase-input': { width: '82%' },
  };

  const typographyTitleStyle = {
    position: 'absolute',
    top: 23,
    right: 5,
    color: 'var(--text-color)',
    padding: '4px',
    borderRadius: '4px',
  };

  const typographyTagStyle = {
    position: 'absolute',
    top: 90,
    right: 5,
    color: 'var(--text-color)',
    padding: '4px',
    borderRadius: '4px',
  };

  const createRoom = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'CREATE',
          data: { title, tags: tagList },
        })
      );
      setOpen(false);
      setTitle('');
      setTagText('');
      setTagList([]);
      fetchRooms(); // 방을 생성할 때도 방 목록 갱신
    }
  };

  const handleRoomList = event => {
    try {
      const response = JSON.parse(event.data);
      const roomId = response?.data?.result;
      console.log(roomId);
      setRoomData(roomId);
    } catch (error) {
      setRoomData(0);
      console.log('response data is none.');
    }
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" sx={dialogStyle}>
      <DialogTitle id="form-dialog-title" sx={{ color: 'var(--text-color)' }}>
        채팅방 생성하기
      </DialogTitle>
      <DialogContent sx={{ p: '0px 24px' }}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="제목"
            type="text"
            fullWidth
            rows={6}
            value={title}
            onChange={e => setTitle(e.target.value)}
            sx={textFieldStyle}
            variant="outlined"
            InputProps={{
              inputProps: {
                maxLength: 50,
                onKeyPress: onKeyEnter,
                ref: firstRef,
              },
            }}
          />
          <Typography variant="caption" sx={typographyTitleStyle}>
            {title.length} / 50
          </Typography>
          <TextField
            margin="dense"
            id="tagText"
            label="태그"
            type="text"
            fullWidth
            rows={6}
            value={tagText.replace(/\s/gi, '')}
            onChange={e => setTagText(e.target.value)}
            sx={textFieldStyle}
            variant="outlined"
            InputProps={{
              inputProps: {
                maxLength: 300,
                onKeyDown: onKeyTag,
                ref: secondRef,
              },
            }}
            placeholder="Enter를 치면 태그가 생성됩니다."
          />
          <div className={style.tagBox}>
            {tagList.map((tag, index) => (
              <div className={style.tagItem} key={index}>
                <span>{tag}</span>
                <button className={style.tagDeleteBtn} onClick={deleteTagItem}>
                  X
                </button>
              </div>
            ))}
          </div>

          <Typography variant="caption" sx={typographyTagStyle}>
            {tagList.length} / 30
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          type="button"
          onClick={onClose}
          color="primary"
          sx={{
            right: '290px',
            bgcolor: 'var(--sub-color)',
            color: 'var(--text-color)',
            borderColor: 'var(--border-color)',
            ':hover': { bgcolor: '#1f262e' },
          }}
        >
          취소
        </Button>
        <Button
          type="button"
          onClick={createRoom}
          color="primary"
          sx={{
            right: '18px',
            bgcolor: 'primary.main',
            color: 'var(--text-color)',
            ':hover': { bgcolor: 'primary.dark' },
          }}
        >
          채팅방 생성하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChatCreateModal;
