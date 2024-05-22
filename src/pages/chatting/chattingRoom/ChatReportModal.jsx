import React, { useState, useRef, useEffect } from 'react';
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
import { useMutation } from 'react-query';
import { reportUser } from '../../../utils/user';

const ChatReportModal = ({ isOpen, onClose, userListData, userReportId }) => {
  const [reportContent, setReportContent] = useState('');
  const imgRef = useRef(null);
  const [user, setUser] = useState('');
  const [reportImg, setReportImg] = useState('첨부파일');
  const [realFile, setRealFile] = useState(null);

  useEffect(() => {
    if (userReportId) {
      const userToReport = userListData.find(
        user => user.userId === userReportId
      );
      if (userToReport) {
        setUser(userToReport);
      }
    }
  }, [userReportId, userListData]);
  const handleFileChange = () => {
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const file = imgRef.current.files[0];
      setRealFile(file);
      const fileName = imgRef.current.files[0].name;
      setReportImg(fileName);
    }
  };

  const clickFileInput = e => {
    e.preventDefault();
    imgRef.current?.click();
  };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      width: '600px',
      height: 'auto',
      bgcolor: 'var(--background-color)',
      padding: '20px',
    },
  };
  const deleteClick = e => {
    e.preventDefault();
    if (imgRef.current.value !== '') {
      setReportImg('첨부파일');
      setRealFile(null);
    }
  };

  const { mutate: submit } = useMutation(reportUser, {
    onSuccess: () => {
      alert('신고가 완료되었습니다!');
      setUser('');
      setReportContent('');
      setRealFile('');
      setReportImg('첨부파일');
      onClose();
    },
    onError: error => {
      alert(`신고가 실패하였습니다. : ${error.message}`);
    },
  });

  const reportUserGo = e => {
    e.preventDefault();

    const formData = new FormData();

    if (!user) {
      alert('신고할 유저가 선택되지 않았습니다!');
    } else if (!reportContent) {
      alert('내용을 간단하게라도 입력해 주세요!');
    } else if (!realFile) {
      alert('증거 이미지를 첨부해야 신고가 가능합니다!');
    } else {
      formData.append('userId', user.userId);
      formData.append('reportReason', reportContent);
      formData.append('file', realFile);
      submit(formData);
    }
  };

  console.log(userListData);
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
  console.log(user);
  const typographyTagStyle = {
    position: 'absolute',
    bottom: 158,
    right: 70,
    color: 'var(--text-color)',
    padding: '4px',
    borderRadius: '4px',
  };

  return (
    <Dialog open={isOpen} onClose={onClose} sx={dialogStyle}>
      <form onSubmit={reportUserGo} method="post" encType="multipart/form-data">
        <DialogTitle
          id="form-dialog-title"
          sx={{ m: 1, color: 'var(--text-color)' }}
        >
          신고하기
        </DialogTitle>
        <DialogContent sx={{ p: '5px 24px' }}>
          <Box component="form" sx={{ m: 1 }} noValidate autoComplete="off">
            <TextField
              id="outlined-select-currency"
              label="채팅 참여자 목록"
              select
              fullWidth
              helperText="신고할 유저를 선택하세요"
              sx={textFieldStyle}
              variant="outlined"
              value={user}
              onChange={e => setUser(e.target.value)}
            >
              {userListData.map(option => (
                <MenuItem
                  key={option.userId}
                  // onClick={handleClick}
                  value={option}
                >
                  {option.nickname}
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
              onChange={e => setReportContent(e.target.value)}
              sx={textFieldStyle}
              variant="outlined"
              InputProps={{
                inputProps: {
                  maxLength: 300,
                },
              }}
            />

            <Typography variant="caption" sx={typographyTagStyle}>
              {reportContent.length}/ 300
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
            type="submit"
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
      </form>
    </Dialog>
  );
};
export default ChatReportModal;
