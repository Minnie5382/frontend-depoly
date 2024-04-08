import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';

const Header = () => {
  return (
    <div className={style.header}>
      <img src={logo} alt='logo' className={style.logo} />
      <div className={style.menu}>
        <Link to='/' className={style.menuLink}>
          메인
        </Link>
        <Link to='/' className={style.menuLink}>
          채팅
        </Link>
        <Link to='/' className={style.menuLink}>
          게시판
        </Link>
        <TextField
          hiddenLabel
          variant='filled'
          size='small'
          sx={{
            '& .MuiInputBase-root': {
              borderBottom: '1px solid var(--point-color)',
              '& input': {
                color: '#fff',
              },
            },
          }}
          className={style.searchField}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon className={style.searchIcon} />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <Link to='/signin' className={style.menuLink}>
          로그인
        </Link>
        <Link to='/signup' className={style.menuLink}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default Header;
