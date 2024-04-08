import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import style from './Header.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';

const Header = () => {
  const TextFieldTheme = {
    '& .MuiInputBase-root': {
      borderBottom: '1px solid var(--point-color)',
      backgroundColor: '#101418',
      paddingRight: '3px',
      '& input': {
        color: '#fff',
        width: '20vw',
      },
    },
  };

  return (
    <div className={style.header}>
      <img src={logo} alt="logo" className={style.logo} />
      <div className={style.menu}>
        <Link to="/" className={style.menuLink}>
          메인
        </Link>
        <Link to="/" className={style.menuLink}>
          채팅방
        </Link>
        <Link to="/" className={style.menuLink}>
          게시판
        </Link>
      </div>
      <div className={style.rightMenu}>
        <TextField
          hiddenLabel
          variant="filled"
          size="small"
          sx={TextFieldTheme}
          className={style.searchField}
          InputProps={{
            endAdornment: (
              <button className={style.searchBtn}>
                <SearchIcon className={style.searchIcon} />
              </button>
            ),
          }}
        />

        <div className={style.menu}>
          <Link to="/signin" className={style.signBtn}>
            로그인
          </Link>
          <Link to="/signup" className={style.signBtn}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
