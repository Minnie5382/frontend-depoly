import React, { useState, useRef, useEffect } from 'react';
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

const ChatCreateModal = ({ isOpen, setOpen }) => {
  const [title, setTitle] = useState('');
  const [tagText, setTagText] = useState('');
  const [tagList, setTagList] = useState([]);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const socket = useSocket();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const onClose = e => {
    e.preventDefault();
    setOpen(false);
    setTitle('');
    setTagText('');
    setTagList([]);
    setErrorMessage('');
  };
  console.log(tagText);

  const onKeyTag = e => {
    if (
      e.target.value.length !== 0 &&
      (e.key === 'Enter' ||
        e.code === 'Enter' ||
        e.key === ' ' ||
        e.code === 'Space')
    ) {
      if (!e.nativeEvent.isComposing) {
        const tagAddRegex = /^[가-힣a-zA-Z0-9]+$/; // 한글, 영문, 숫자만 허용
        const trimmedTag = e.target.value.trim().replace(tagRegex, '');
        if (tagList.length < 30 && tagAddRegex.test(trimmedTag)) {
          submittagText(trimmedTag);
        } else if (tagList.length >= 30) {
          alert('태그는 30개까지만 등록 가능합니다.');
        } else if (!tagAddRegex.test(trimmedTag)) {
          alert('태그에 특수문자를 포함할 수 없습니다.');
          setTagText('');
        }
      }
    }
  };

  const handleTagTextChange = e => {
    const value = e.target.value.replace(tagRegex, '');
    setTagText(value);
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
    margin: '10px 0px',
    '& .Mui-focused.MuiAutocomplete-input': {
      color: 'blue',
    },
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
    '& .MuiInputBase-input': {
      width: '82%',
      borderColor: 'var(--border-color)',
    },
    '& .MuiFormHelperText-root': {
      bgcolor: 'var(--background-color)',
      m: 0,
      p: '1px 10px',
      position: 'absolute',
      top: '56px',
    },
  };

  const typographyTitleStyle = {
    position: 'absolute',
    top: 24,
    right: 5,
    color: 'var(--text-color)',
    padding: '4px',
    borderRadius: '4px',
  };

  const typographyTagStyle = {
    position: 'absolute',
    top: 100,
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
    }
  };
  const tagRegex = /[\s!@#$%^&*()_+\-={}\[\]|\\:;"'<>,.?/]/gi;

  const handleError = event => {
    const response = JSON.parse(event.data);
    if (response.type === 'ERROR') {
      console.log(response);
      setErrorMessage(
        '같은 이름의 채팅방이 존재 합니다. 다른 이름을 사용해주세요'
      );
      setTitle('');
    } else {
      setOpen(false);
      setTitle('');
      setTagText('');
      setTagList([]);
      // fetchRooms(); // 방을 생성할 때도 방 목록 갱신
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', handleError);

    return () => {
      socket.removeEventListener('message', handleError);
    };
  }, [socket]);

  const handleMessageChange = e => {
    setTitle(e.target.value);
    console.log(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
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
            onChange={handleMessageChange}
            sx={textFieldStyle}
            error={errorMessage ? true : false}
            helperText={errorMessage}
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
            value={tagText}
            onChange={handleTagTextChange}
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
