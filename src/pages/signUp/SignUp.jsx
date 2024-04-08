import React from 'react';
import { Button, TextField, Link, Stack } from '@mui/material';
import style from './SignUp.module.css';
import logo from '../../assets/logo2.png';

const SignUp = () => {
  return (
    <div className={style.pageContainer}>
      <img src={logo} alt='로고' className={style.logo} />
      <div className={style.signUpContainer}>
        <span className={style.title}>회원가입</span>
        <form className={style.form}>
          <TextField
            label='이메일'
            type='email'
            variant='outlined'
            fullWidth
            size='small'
            required
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .Mui-focused': {
                color: 'var(--point-color)',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--text-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <TextField
            label='비밀번호'
            type='password'
            variant='outlined'
            size='small'
            fullWidth
            required
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .Mui-focused': {
                color: 'var(--point-color)',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--text-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <TextField
            label='비밀번호 확인'
            type='password'
            variant='outlined'
            size='small'
            fullWidth
            required
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .Mui-focused': {
                color: 'var(--point-color)',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--text-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <TextField
            label='이름'
            type='text'
            variant='outlined'
            fullWidth
            size='small'
            required
            sx={{
              '& .MuiInputLabel-root': {
                color: 'var(--text-color)',
              },
              '& .Mui-focused': {
                color: 'var(--point-color)',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: 'var(--text-color)',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'var(--text-color)',
                },
                '&:hover fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'var(--point-color)',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <Stack direction='row' spacing={1}>
            <TextField
              label='휴대폰 번호'
              type='text'
              variant='outlined'
              fullWidth
              required
              size='small'
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'var(--text-color)',
                },
                '& .Mui-focused': {
                  color: 'var(--point-color)',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'var(--text-color)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--text-color)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--point-color)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--point-color)',
                  },
                  '& input': {
                    color: '#fff',
                  },
                },
              }}
            />
            <Button variant='contained'>인증</Button>
          </Stack>

          <Stack direction='row' spacing={1}>
            <TextField
              label='인증번호 입력'
              type='text'
              variant='outlined'
              fullWidth
              size='small'
              required
              sx={{
                '& .MuiInputLabel-root': {
                  color: 'var(--text-color)',
                },
                '& .Mui-focused': {
                  color: 'var(--point-color)',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'var(--text-color)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'var(--text-color)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--point-color)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'var(--point-color)',
                  },
                  '& input': {
                    color: '#fff',
                  },
                },
              }}
            />
            <Button variant='contained'>확인</Button>
          </Stack>

          <Button
            variant='contained'
            fullWidth
            type='submit'
            sx={{ height: '30px' }}
          >
            회원가입
          </Button>

          <div className={style.signInPrompt}>
            <span>이미 아이디가 있으신가요?&nbsp;&nbsp;</span>
            <Link href='/signin' underline='none'>
              로그인 하러가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
