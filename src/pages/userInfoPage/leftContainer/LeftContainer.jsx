import React, { useState } from 'react';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { LinearProgress, Tab, Tabs, Box, Typography } from '@mui/material';
import style from '../UserInfoPage.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const LeftContainer = ({ tab, setTab }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const confirmAndUserDelete = () => {
  //   if (window.confirm('정말 탈퇴하시겠습니까?')) {
  //     // UserDelete();
  //     handleClose();
  //   }
  // };

  const tabStyle = (isSelected) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    border: `1px solid ${
      isSelected ? 'var(--point-color)' : 'var(--text-color)'
    }`,
    borderRadius: '23px',
    padding: '10px 18px',
    color: `${isSelected ? 'var(--point-color)' : 'var(--text-color)'}`,
  });

  const tabNames = {
    collection: '컬렉션',
    scrap: '스크랩',
    following: '팔로잉',
    followers: '팔로워',
  };

  return (
    <div className={style.leftContainer}>
      <div className={style.topBar}>
        <span>유저_1234</span>
        <button className={style.settingBtn} onClick={handleClick}>
          <SettingsIcon />
        </button>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>회원정보 변경</MenuItem>
          <MenuItem onClick={handleClose}>로그아웃</MenuItem>
        </Menu>
      </div>
      <div className={style.userContainer}>
        <div className={style.userImg}>
          <img src="http://via.placeholder.com/170x170" alt="" />
          <p title="애니메이션 영화 선호">
            다채로운 색상과 독특한 캐릭터, 그 화면 속 영원한 어린이
          </p>
        </div>
        <div className={style.userInfo}>
          <div>
            <span>Lv.100</span>
            <span className={style.userName}>김희석</span>
          </div>
          <span>왕관</span>
        </div>
        <LinearProgress
          variant="determinate"
          value={60}
          style={{
            width: '100%',
            height: '20px',
            margin: '20px 0',
            borderRadius: '10px',
          }}
        />
      </div>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        aria-label="profile tabs"
      >
        {Object.entries(tabNames).map(([key, label]) => (
          <Tab
            key={key}
            value={key}
            label={
              <Box sx={tabStyle(tab === key)}>
                <Typography variant="body1">{label}</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    backgroundColor: 'var(--point-color)',
                    color: 'white',
                    padding: '0 8px',
                    borderRadius: '12px',
                  }}
                >
                  100
                </Typography>
              </Box>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default LeftContainer;
