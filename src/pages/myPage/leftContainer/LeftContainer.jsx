import React from 'react';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { LinearProgress, Tab, Tabs, Box, Typography } from '@mui/material';
import style from '../MyPage.module.css';

const LeftContainer = ({ tab, setTab }) => {
  const tabStyle = (isSelected) => ({
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    border: `1px solid ${
      isSelected ? 'var(--point-color)' : 'var(--text-color)'
    }`,
    borderRadius: '10px',
    padding: '10px 20px',
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
        <SettingsIcon />
      </div>
      <div className={style.userContainer}>
        <div className={style.userImg}>
          <img src='http://via.placeholder.com/170x170' alt='' />
          <p>다채로운 색상과 독특한 캐릭터, 그 화면 속 영원한 어린이</p>
        </div>
        <div className={style.userInfo}>
          <div>
            <span>Lv.100</span>
            <span className={style.userName}>김희석</span>
          </div>
          <span>왕관</span>
        </div>
        <LinearProgress
          variant='determinate'
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
        orientation='vertical'
        variant='scrollable'
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        aria-label='profile tabs'
      >
        {Object.entries(tabNames).map(([key, label]) => (
          <Tab
            key={key}
            value={key}
            label={
              <Box sx={tabStyle(tab === key)}>
                <Typography variant='body1'>{label}</Typography>
                <Typography
                  variant='body1'
                  sx={{
                    backgroundColor: 'var(--point-color)',
                    color: 'white',
                    padding: '0 8px',
                    borderRadius: '5px',
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
