import React, { useState } from 'react';
import { Slide, Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TMDBLogo from '../../assets/tmdb_logo.svg';
import koficLogo from '../../assets/kofic_logo.png';

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const handleToggleFooter = () => {
    setVisible(!visible);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <Slide direction='up' in={visible} mountOnEnter unmountOnExit>
        <Box
          sx={{
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'var(--sub-color)',
          }}
        >
          <span style={{ color: 'var(--text-color)' }}>
            영화 데이터 제공 👉🏻
          </span>
          <img src={TMDBLogo} alt='TMDBLogo' style={{ width: 260 }} />
          <img src={koficLogo} alt='koficLogo' />
        </Box>
      </Slide>
      <IconButton
        color='primary'
        size='small'
        sx={{
          position: 'absolute',
          top: visible ? -16 : -30,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'transparent',
        }}
        onClick={handleToggleFooter}
      >
        {visible ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </IconButton>
    </Box>
  );
};

export default Footer;
