import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import style from './ChatRoom.module.css';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';

const ChatReportModal = ({ isOpen, onClose }) => {
  const [userList, setUserList] = useState([
    {
      value: '유저1',
      label: 'user1',
    },
    {
      value: '유저2',
      label: 'user2',
    },
  ]);
  const [reportContent, setReportContent] = useState('');
  const imgRef = useRef(null);
  const [reportUser, setReportUser] = useState('');
  const [reportImg, setReportImg] = useState('첨부파일');
  //   const [anchorEl, setAnchorEl] = useState(null);
  //   const open = Boolean(anchorEl);

  console.log(reportImg);

  const handleFileChange = () => {
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const fileName = imgRef.current.value; //현재 파일 값을 정의
      setReportImg(fileName);
    }
  };

  //   const handleClick = (event) => {
  //     setAnchorEl(event.target.value);
  //   };

  const clickFileInput = (e) => {
    e.preventDefault();
    imgRef.current?.click();
  };

  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      width: '600px',
      height: 'auto',
      bgcolor: 'var(--background-color)',
      padding: '20px',
    },
  };
  const deleteClick = (e) => {
    e.preventDefault();
    if (imgRef.current.value !== '') {
      setReportImg('첨부파일');
    }
  };

  const textFieldStyle = {
    // bgcolor: 'var(--sub-color)',
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
    '& .MuiInputBase-input': { height: '130px' },
    '& .MuiFormHelperText-root': {
      color: 'var(--text-color)',
      bgcolor: 'unset',
    },
    '& .MuiSvgIcon-root': {
      color: 'var(--text-color)',
    },
  };

  const typographyTagStyle = {
    position: 'absolute',
    bottom: 158,
    right: 70,
    color: 'var(--text-color)',
    padding: '4px',
    borderRadius: '4px',
  };

  return (
    <Dialog open={isOpen} aria-labelledby="form-dialog-title" sx={dialogStyle}>
      <DialogTitle
        id="form-dialog-title"
        sx={{ m: 1, color: 'var(--text-color)' }}
      >
        신고하기
      </DialogTitle>
      <DialogContent sx={{ p: '5px 24px' }}>
        <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
          <TextField
            autoFocus
            id="outlined-select-currency"
            label="채팅 참여자 목록"
            select
            fullWidth
            helperText="신고할 유저를 선택하세요"
            sx={textFieldStyle}
            variant="outlined"
            value={reportUser}
            onChange={(e) => setReportUser(e.target.value)}
          >
            {/* <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              props={{
                style: {
                  maxHeight: 200,
                  width: 200,
                },
              }}
            > */}
            {userList.map((option) => (
              <MenuItem
                key={option.value}
                // onClick={handleClick}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
            {/* </Menu> */}
          </TextField>

          <TextField
            margin="dense"
            id="name"
            label="신고 내용"
            type="text"
            fullWidth
            height="100px"
            rows={6}
            multiline
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            sx={textFieldStyle}
            variant="outlined"
            InputProps={{
              inputProps: {
                maxLength: 300,
              },
            }}
          />

          <Typography variant="caption" sx={typographyTagStyle}>
            {/* {tagList.length} / 30 */}/ 30
          </Typography>
          <Box sx={{ width: '100%', height: 60 }}>
            <input
              className={style.imgInput}
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={imgRef}
              hidden
            />

            <label>
              <button className={style.imgSelect} onClick={clickFileInput}>
                이미지 선택
              </button>
            </label>

            <input
              className={style.uploadName}
              value={reportImg}
              disabled
              placeholder={reportImg}
            />
            <button className={style.imgDelete} onClick={deleteClick}>
              X
            </button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: '0px 25px', justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          color="primary"
          sx={{
            // right: '290px',
            bgcolor: 'var(--sub-color)',
            color: 'var(--text-color)',
            borderColor: 'var(--border-color)',
            ':hover': { bgcolor: '#1f262e' },
          }}
        >
          취소
        </Button>
        <Button
          //   onClick={handleReportSubmit}
          color="primary"
          sx={{
            bgcolor: 'primary.main',
            color: 'var(--text-color)',
            ':hover': { bgcolor: 'primary.dark' },
          }}
        >
          신고 접수
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ChatReportModal;
