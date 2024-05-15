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
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useUser } from '../../utils/UserContext';

const UserInfoModal = ({ isOpen, onClose, myId }) => {
  const { userId } = useParams();
  const { user } = useUser();
  const [file, setFile] = useState('첨부파일');
  const [realFile, setRealFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [originalImg, setOriginalImg] = useState('');
  const [infoData, setInfoData] = useState({
    userProfileImage: '',
    nickname: '',
    email: '',
    password: null,
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [nicknameValid, setNicknameValid] = useState(false);

  const isKakaoLogin = user?.result.isKakao;
  const id = Boolean(myId === userId);

  const { isLoading, isError } = useQuery('getProfile', getUserProfile, {
    onSuccess: (data) => {
      const inData = data?.data?.result;
      setInfoData({
        userProfileImage: inData.userProfileImage,
        nickname: inData.nickname,
        email: inData.email,
      });
      console.log(inData);
      setOriginalNickname(inData.nickname);
      setOriginalImg(inData.userProfileImage);
      if (
        inData.userProfileImage !==
        'data:image/png;base64,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'
      ) {
        setFile('현재 이미지');
      }
    },
    enabled: id,
  });

  const clickNicknameCheck = () => {
    if (nicknameRegex.test) {
      checkNicknameDuplication({ nickname: infoData.nickname })
        .then((res) => {
          console.log(res);
          alert('중복 확인 완료!');
          setNicknameValid(true);
        })
        .catch((error) => {
          console.log(error);
          alert('중복된 닉네임이 존재합니다.');
        });
    }
  };

  const imgRef = useRef(null);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (imgRef.current.value !== '') {
      //값이 텅 빈 것이 아니라면
      const img = imgRef.current.files[0];
      setRealFile(img); //진짜 파일 값
      //미리보기
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      const fileName = imgRef.current.files[0].name; //첨부파일이름
      setFile(fileName);
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
    console.log(name, value);
    if (name === 'nickname') {
      setNicknameValid(false);
    }
    setInfoData((prev) => ({ ...prev, [name]: value }));
    const errorMessage = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const { mutate: doEdit } = useMutation(updateUserProfile, {
    onSuccess: () => {
      alert('정보 변경이 성공적으로 완료되었습니다.');
      console.log(doEdit);
      window.location.reload(true);
    },
    onError: (error) => {
      alert(`정보변경이 실패하였습니다. : ${error.message}`);
    },
  });

  const myProfileSubmit = (event) => {
    event.preventDefault();
    let errors = {};

    const formData = new FormData();

    if (!nicknameRegex.test(infoData.nickname)) {
      errors.nicknameError = '닉네임에 특수문자 또는 공백이 포함되어 있습니다.';
    }
    if (!nicknameValid && originalNickname !== infoData.nickname) {
      errors.nicknameError = '닉네임 중복 검사를 통과하지 못했습니다.';
    }
    if (
      infoData.password !== '' &&
      infoData.password !== infoData.confirmPassword
    ) {
      errors.passwordError = '비밀번호가 일치하지 않습니다.';
    }
    if (
      infoData.password !== ('' || undefined) &&
      !passwordRegex.test(infoData.password)
    ) {
      errors.passwordError =
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
      console.log(infoData.password);
    }
    if (Object.keys(errors).length === 0) {
      if (file === originalImg) {
        formData.append('userProfileImage', '');
      } else {
        formData.append('userProfileImage', realFile);
      }
      if (infoData.password === undefined) {
        formData.append('password', '');
      } else {
        formData.append('password', infoData.password);
      }
      if (infoData.nickname === originalNickname) {
        formData.append('nickname', '');
      } else {
        formData.append('nickname', infoData.nickname);
      }
      doEdit(formData);
      for (let key of formData.keys()) {
        console.log(key, ':', formData.get(key));
      }
      console.log(formData);
    } else {
      alert(errors.nicknameError || errors.passwordError);
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
  const kakaoDialogStyle = {
    '& .MuiDialog-paper': {
      width: '400px',
      height: '501px',
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

  return (
    <Dialog
      open={isOpen}
      //   onClose={onClose}
      aria-labelledby="form-dialog-title"
      sx={isKakaoLogin ? kakaoDialogStyle : dialogStyle}
    >
      {isLoading ? (
        <div>정보를 불러오는 중입니다.</div>
      ) : isError ? (
        <div>정보를 불러오지 못했습니다.</div>
      ) : (
        <form
          onSubmit={myProfileSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <DialogTitle
            id="form-dialog-title"
            sx={{ color: 'var(--text-color)', padding: '8px 24px' }}
          >
            회원정보 변경
          </DialogTitle>
          <DialogContent sx={{ p: '0px 24px' }}>
            <Box
              sx={{
                width: '100%',
                height: 219,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '17px 0px',
              }}
            >
              <div className={style.userInfoImgContainer}>
                <img
                  className={style.userInfoImg}
                  src={preview ? preview : infoData.userProfileImage}
                  alt=""
                />
              </div>
              <div className={style.imgFileInput}>
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
            <Stack direction="row" spacing={2} sx={{ margin: '5px 0px' }}>
              <TextField
                name="nickname"
                label="닉네임"
                type="text"
                variant="outlined"
                helperText={errors.nickname || ' '}
                error={!!errors.nickname}
                defaultValue={infoData.nickname}
                onChange={handleChange}
                fullWidth
                size="small"
                sx={textFieldStyle}
                autoComplete="off"
              />
              <Button
                variant="contained"
                onClick={clickNicknameCheck}
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
              helperText={' '}
              value={infoData.email}
              InputProps={{
                readOnly: true,
              }}
            />
            {isKakaoLogin ? (
              <></>
            ) : (
              <Stack>
                <TextField
                  name="password"
                  label="비밀번호"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  helperText={errors.password || ' '}
                  error={!!errors.password}
                  defaultValue={infoData.password}
                  onChange={handleChange}
                  sx={textFieldStyle}
                  autoComplete="off"
                />
                <TextField
                  name="confirmPassword"
                  label="비밀번호 확인"
                  type="password"
                  variant="outlined"
                  fullWidth
                  size="small"
                  helperText={errors.confirmPassword || ' '}
                  error={!!errors.confirmPassword}
                  defaultValue={infoData.confirmPassword}
                  onChange={handleChange}
                  sx={textFieldStyle}
                  autoComplete="off"
                />
              </Stack>
            )}
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
              정보변경
            </Button>
          </DialogActions>
        </form>
      )}
    </Dialog>
  );
};
export default UserInfoModal;
