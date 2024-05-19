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

const ChatCreateModal = ({ isOpen, setOpen }) => {
  const [title, setTitle] = useState('');
  const [tagText, setTagText] = useState('');
  const [tagList, setTagList] = useState([]);
  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const socket = useSocket();

  const onClose = e => {
    e.preventDefault();

    setOpen(false);
    setTitle('');
    setTagText('');
    setTagList([]);
  };

  console.log(tagText);
  console.log(tagList);

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
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      if (e.target === firstRef.current) {
        // 첫 번째 input에서 엔터를 눌렀을 때
        secondRef.current.focus(); // 두 번째 input으로 focus
      }
    }
  };

  const submittagText = e => {
    console.log(e);
    if (secondRef.current) {
      let updatedTagList = [...tagList];
      updatedTagList.push(tagText);
      console.log(updatedTagList);
      setTagList(updatedTagList);
      setTagText('');
    }
  };

  const deleteTagItem = e => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      tagText => tagText !== deleteTagItem
    );
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
          // data: { title: 'movie23', tags: ['crime', 'action'] },
          data: { title: title, tags: tagList },
        })
      );
      //해당 룸으로 이동시켜야함
    }
  };
  // console.log(title);

  return (
    <Dialog
      open={isOpen}
      // onClose={onClose}
      aria-labelledby="form-dialog-title"
      sx={dialogStyle}
    >
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
                onKeyDown: onKeyEnter,
                ref: firstRef,
              },
            }}
          />
          {/* > */}
          <Typography variant="caption" sx={typographyTitleStyle}>
            {/* {title.length} / 50 */}/ 50
          </Typography>
          {/* </TextField> */}
          {/* =============================== 태 그 ===================================== */}
          <TextField
            margin="dense"
            id="tagText"
            label="태그"
            type="text"
            fullWidth
            rows={6}
            value={tagText}
            onChange={e => setTagText(e.target.value)}
            sx={textFieldStyle}
            variant="outlined"
            InputProps={{
              inputProps: {
                maxLength: 300,
                onKeyDown: e => onKeyTag(e),
                ref: secondRef,
              },
            }}
          >
            {' '}
          </TextField>
          <div className={style.tagBox}>
            {tagList.map((tagText, index) => (
              <div className={style.tagItem} key={index}>
                <span>{tagText}</span>
                <button className={style.tagDeleteBtn} onClick={deleteTagItem}>
                  X
                </button>
              </div>
            ))}
          </div>

          <Typography variant="caption" sx={typographyTagStyle}>
            {/* {tagList.length} / 30/ 30 */}
          </Typography>
          <div
            className={style.tagInput}
            type="text"
            placeholder="Press enter to add tags"
            onChange={e => setTagText(e.target.value)}
            value={tagText}
            onKeyDown={onKeyTag}
          />
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
