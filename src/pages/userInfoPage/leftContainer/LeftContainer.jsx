import React, { useState } from 'react';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { LinearProgress, Tab, Tabs, Box, Typography } from '@mui/material';
import style from '../UserInfoPage.module.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FollowButton from '../../../components/button/FollowButton';
import UserInfoModal from '../UserInfoModal';
import { useUser } from '../../../utils/UserContext';
import { useParams } from 'react-router-dom';

const LeftContainer = ({ tab, setTab, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);

  const { user } = useUser();
  const { userId } = useParams();

  const open = Boolean(anchorEl);
  const myId = user.result.userId;
  const expPercentage = (data.data.result.exp / data.data.result.expMax) * 100;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openModal = () => {
    setUserInfoModalOpen(true);
  };
  const closeModal = () => {
    setUserInfoModalOpen(false);
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

  const tabInfo = {
    collection: { label: '컬렉션', count: data?.data?.result?.collectionNum },
    scrap: { label: '스크랩', count: data?.data?.result?.scrapNum },
    following: { label: '팔로잉', count: data?.data?.result?.followingNum },
    followers: { label: '팔로워', count: data?.data?.result?.followerNum },
  };

  return (
    <div className={style.leftContainer}>
      <div className={style.topBar}>
        {userId === myId ? (
          <FollowButton />
        ) : (
          <button className={style.settingBtn} onClick={handleClick}>
            <SettingsIcon />
          </button>
        )}
        <Menu
          id='demo-positioned-menu'
          aria-labelledby='demo-positioned-button'
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
          <MenuItem onClick={openModal}>회원정보 변경</MenuItem>
          <MenuItem onClick={handleClose}>로그아웃</MenuItem>
        </Menu>
      </div>
      <div className={style.userContainer}>
        <div className={style.userImg}>
          <img src='http://via.placeholder.com/170x170' alt='' />
        </div>
        <div className={style.userInfo}>
          <div>
            <span>Lv.{data.data.result.level}</span>
            <span className={style.userName}>{data.data.result.nickname}</span>
          </div>
          {data.data.result.isCertified && (
            <span className={style.icon}>왕관</span>
          )}
          {data.data.result.isBad && <span className={style.icon}>해골</span>}
        </div>
        <LinearProgress
          variant='determinate'
          value={expPercentage}
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
        {Object.entries(tabInfo).map(([key, { label, count }]) => (
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
                    borderRadius: '12px',
                  }}
                >
                  {count || 0}
                </Typography>
              </Box>
            }
          />
        ))}
      </Tabs>
      <UserInfoModal isOpen={userInfoModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LeftContainer;
