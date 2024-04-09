import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import style from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo2.png';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className={style.header}>
      <img src={logo} alt='logo' className={style.logo} />
      <div className={style.menu}>
        <Link to='/' className={style.menuLink}>
          메인
        </Link>
        <Link to='/' className={style.menuLink}>
          채팅방
        </Link>
        <Link to='/' className={style.menuLink}>
          게시판
        </Link>
      </div>
      <div className={style.rightMenu}>
        <form onSubmit={handleSearch}>
          <TextField
            hiddenLabel
            variant='filled'
            size='small'
            sx={TextFieldTheme}
            className={style.searchField}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <button type='submit' className={style.searchBtn}>
                  <SearchIcon className={style.searchIcon} />
                </button>
              ),
            }}
          />
        </form>
        <div className={style.menu}>
          <Link to='/signin' className={style.signBtn}>
            로그인
          </Link>
          <Link to='/signup' className={style.signBtn}>
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
