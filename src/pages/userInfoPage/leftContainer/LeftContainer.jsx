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

  const { user, logout } = useUser();
  const { userId } = useParams();

  const open = Boolean(anchorEl);
  const myId = user?.result.userId || null;
  const result = data?.data?.result;

  const expPercentage = (result.exp / result.expMax) * 100;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    if (userId !== myId) {
      alert('본인이 아닙니다.');
    } else {
      setUserInfoModalOpen(true);
    }
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
    collection: { label: '컬렉션', count: result?.collectionNum },
    scrap: { label: '스크랩', count: result?.scrapNum },
    following: { label: '팔로잉', count: result?.followingNum },
    followers: { label: '팔로워', count: result?.followerNum },
  };

  return (
    <div className={style.leftContainer}>
      <div className={style.topBar}>
        {userId !== myId ? (
          <FollowButton userId={userId} isFollowed={result.isFollowed} />
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
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Menu>
      </div>
      <div className={style.userContainer}>
        <div className={style.userImg}>
          <img src={result.userProfileImage} alt='' />
        </div>
        <div className={style.userInfo}>
          <div>
            <span>Lv.{result.level}</span>
            <span className={style.userName}>{result.nickname}</span>
          </div>
          {result.isCertified && <span className={style.icon}>👑</span>}
          {result.isBad && <span className={style.icon}>💀</span>}
        </div>
        <p title={result.genreLabel.description || '데이터 표본 부족!'}>
          {result.genreLabel.label || '데이터 표본이 부족합니다.'}
        </p>
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
      <UserInfoModal
        isOpen={userInfoModalOpen}
        onClose={closeModal}
        myId={myId}
      />
    </div>
  );
};

export default LeftContainer;
