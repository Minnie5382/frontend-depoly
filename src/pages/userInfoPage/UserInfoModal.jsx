import React, { useState, useRef, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Stack } from '@mui/material';
import style from './UserInfoPage.module.css';
import {
  getUserProfile,
  checkNicknameDuplication,
  updateUserProfile,
} from '../../utils/user';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const UserInfoModal = ({ isOpen, onClose, myId }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState('첨부파일');
  const [preview, setPreview] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [originalImg, setOriginalImg] = useState('');
  const [infoData, setInfoData] = useState({
    userProfileImage: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [nicknameValid, setNicknameValid] = useState(false);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        // console.log(res.data?.result);
        setInfoData({
          userProfileImage: res.data?.result.userProfileImage,
          nickname: res.data?.result.nickname,
          email: res.data?.result.email,
        });
        setOriginalNickname(res.data?.result.nickname);
        setOriginalImg(res.data?.result.userProfileImage);
      })
      .catch((error) => {
        // console.log(error);
        alert('프로필 정보를 가져올 수 없습니다.');
      });
    // reviewImg();
  }, []);

  const clickNicknameCheck = () => {
    if (nicknameRegex.test) {
      checkNicknameDuplication({ nickname: infoData.nickname })
        .then((res) => {
          // console.log(res);
          alert('중복 확인 완료!');
          setNicknameValid(true);
        })
        .catch((error) => {
          // console.log(error);
          alert('중복된 닉네임이 존재합니다.');
        });
    }
  };

  const imgRef = useRef(null);

  //미리보기
  const reviewImg = () => {
    const img = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleFileChange = () => {
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const fileName = imgRef.current.value; //현재 파일 값을 정의
      setFile(fileName);
      reviewImg();
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
      setPreview('');
    }
    if (originalImg) {
      setFile('첨부파일');
      setPreview(originalImg);
    }
  };

  const nicknameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W]).{8,}$/;

  const validate = (name, value) => {
    switch (name) {
      case 'nickname':
        return nicknameRegex.test(value)
          ? ''
          : '닉네임에는 특수문자를 사용할 수 없습니다.';
      case 'password':
        return passwordRegex.test(value)
          ? ''
          : '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
      case 'confirmPassword':
        return value === infoData.password
          ? ''
          : '비밀번호가 일치하지 않습니다.';
      default:
        return '';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setInfoData((prev) => ({ ...prev, [name]: value }));
    const errorMessage = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const { mutate: doEdit, isLoading } = useMutation(updateUserProfile, {
    onSuccess: () => {
      alert('정보 변경이 성공적으로 완료되었습니다.');
      navigate('/userInfo');
      // console.log(doEdit);
    },
    onError: (error) => {
      alert(`정보변경이 실패하였습니다. : ${error.message}`);
      // console.log(doEdit.value);
    },
  });

  const myProfileSubmit = (event) => {
    event.preventDefault();
    if (!nicknameRegex.test(infoData.nickname)) {
      alert('닉네임에 특수문자 또는 공백이 포함되어 있습니다.');
    }
    if (!nicknameValid && originalNickname !== infoData.nickname) {
      alert('닉네임 중복 검사를 통과하지 못했습니다.');
    }
    if (infoData.password !== infoData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
    if (!passwordRegex.test(infoData.password)) {
      alert('숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!');
    } else {
      const data = {
        password: infoData.password,
        userProfileImage: file,
        nickname: infoData.nickname,
      };
      doEdit(data);
      // console.log(doEdit);
    }
  };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      width: '400px',
      height: '640px',
      bgcolor: 'var(--background-color)',
      padding: '20px',
    },
  };
  const textFieldStyle = {
    bgcolor: 'var(--sub-color)',
    margin: '3px 0px',
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
    '& .MuiFormHelperText-root': {
      bgcolor: 'var(--background-color)',
      m: 0,
      p: '1px 10px',
      color: 'var(--text-color)',
    },
  };
  if (isLoading) {
    // isLoading을 사용하여 데이터가 로딩중일 때 화면을 랜더링합니다.
    return <div>Loading...</div>;
  }
  return (
    <Dialog
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby='form-dialog-title'
      sx={dialogStyle}
    >
      <form
        onSubmit={myProfileSubmit}
        method='post'
        encType='multipart/form-data'
      >
        <DialogTitle
          id='form-dialog-title'
          sx={{ color: 'var(--text-color)', padding: '8px 24px' }}
        >
          회원정보 변경
        </DialogTitle>
        <DialogContent sx={{ p: '0px 24px' }}>
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
              className={style.userInfoImg}
              src={preview ? preview : infoData.userProfileImage}
              alt=''
            />
            <div className={style.imgFileInput}>
              <input
                className={style.imgInput}
                type='file'
                id='file'
                accept='image/*'
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
          <Stack direction='row' spacing={2} sx={{ margin: '5px 0px' }}>
            <TextField
              name='nickname'
              label='닉네임'
              type='text'
              variant='outlined'
              helperText={errors.nickname || ' '}
              error={!!errors.nickname}
              defaultValue={infoData.nickname}
              onChange={handleChange}
              fullWidth
              size='small'
              sx={textFieldStyle}
              autoComplete='off'
            />
            <Button
              variant='contained'
              onClick={clickNicknameCheck}
              sx={{ height: '40px', width: '103px', padding: '6px 12px' }}
            >
              중복 확인
            </Button>
          </Stack>
          <TextField
            name='email'
            label='이메일'
            type='text'
            variant='outlined'
            fullWidth
            size='small'
            sx={textFieldStyle}
            helperText={' '}
            value={infoData.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            name='password'
            label='비밀번호'
            type='password'
            variant='outlined'
            fullWidth
            size='small'
            helperText={errors.password || ' '}
            error={!!errors.password}
            defaultValue={infoData.password}
            onChange={handleChange}
            sx={textFieldStyle}
            autoComplete='off'
          />
          <TextField
            name='confirmPassword'
            label='비밀번호 확인'
            type='password'
            variant='outlined'
            fullWidth
            size='small'
            helperText={errors.confirmPassword || ' '}
            error={!!errors.confirmPassword}
            defaultValue={infoData.confirmPassword}
            onChange={handleChange}
            sx={textFieldStyle}
            autoComplete='off'
          />
        </DialogContent>
        <DialogActions
          sx={{
            margin: '0px 17px',
            marginBottom: '11px',
            justifyContent: 'space-between',
          }}
        >
          <Button
            onClick={onClose}
            color='primary'
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
            type='submit'
            color='primary'
            sx={{
              bgcolor: 'primary.main',
              color: 'var(--text-color)',
              ':hover': { bgcolor: 'primary.dark' },
            }}
          >
            {isLoading ? '전송 중' : '정보변경'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default UserInfoModal;
