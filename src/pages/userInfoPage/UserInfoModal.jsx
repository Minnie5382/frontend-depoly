import React, { useState, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Stack } from '@mui/material';
import style from './UserInfoPage.module.css';

const UserInfoModal = ({ isOpen, onClose, myId }) => {
  const [file, setFile] = useState('첨부파일');
  const [preview, setPreview] = useState('');

  const imgRef = useRef(null);

  const handleFileChange = () => {
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const fileName = imgRef.current.value; //현재 파일 값을 정의
      setFile(fileName);

      //미리보기
      const img = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };
  const clickFileInput = (e) => {
    e.preventDefault();
    imgRef.current?.click();
  };
  const deleteClick = (e) => {
    e.preventDefault();
    if (imgRef.current.value !== '') {
      setFile('첨부파일');
    }
  };
  const dialogStyle = {
    '& .MuiDialog-paper': {
      width: '400px',
      height: '643px',
      bgcolor: 'var(--background-color)',
      padding: '20px',
    },
  };
  const textFieldStyle = {
    bgcolor: 'var(--sub-color)',
    margin: '10px 0px',
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

  return (
    <Dialog
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby="form-dialog-title"
      sx={dialogStyle}
    >
      <DialogTitle id="form-dialog-title" sx={{ color: 'var(--text-color)' }}>
        회원정보 변경
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
          <Box
            sx={{
              width: '100%',
              height: 215,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '17px 0px',
            }}
          >
            <img
              style={{ height: '170px', width: '170px', borderRadius: '50%' }}
              src={
                preview
                  ? preview
                  : 'http://localhost:3000/static/media/logo.025139750e8aea5ed49a.png'
              }
              alt=""
            />
            <div style={{ width: '100%' }}>
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

              <input className={style.uploadName} value={file} disabled />
              <button className={style.imgDelete} onClick={deleteClick}>
                X
              </button>
            </div>
          </Box>
          <Stack direction="row" spacing={2} sx={{ margin: '10px 0px' }}>
            <TextField
              name="nickname"
              label="닉네임"
              type="text"
              variant="outlined"
              fullWidth
              size="small"
              sx={textFieldStyle}
            />
            <Button
              variant="contained"
              sx={{ height: '40px', width: '103px', padding: '6px 12px' }}
            >
              중복 확인
            </Button>
          </Stack>
          <TextField
            name="email"
            label="이메일"
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
            value="www@naver.com"
          />
          <TextField
            name="password"
            label="비밀번호"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            variant="outlined"
            fullWidth
            size="small"
            sx={textFieldStyle}
          />
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
          //   onClick={MyInfoSubmit}
          color="primary"
          sx={{
            bgcolor: 'primary.main',
            color: 'var(--text-color)',
            ':hover': { bgcolor: 'primary.dark' },
          }}
        >
          정보변경
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default UserInfoModal;
