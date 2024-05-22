import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Report from '../../assets/free-icon-siren-763421.png';
import style from './chattingRoom/ChatRoom.module.css';
import { ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ChatParticipantList = ({
  setOpen,
  userListData,
  roomExit,
  setUserReportId,
}) => {
  const navigate = useNavigate();

  const Demo = styled('div')({
    color: '#fff',
  });

  const openModal = userId => {
    setOpen(true);
    setUserReportId(userId);
  };
  const userInfoClick = userId => {
    roomExit();
    navigate(`/userInfo/${userId}`);
  };

  return (
    <Grid item xs={12} md={6}>
      <Demo>
        <List sx={{ pt: 0, pb: 0 }}>
          {userListData.map(info => (
            <ListItem
              key={info.userId}
              sx={{ pr: 14 }}
              secondaryAction={
                <button
                  className={style.reportBtn}
                  onClick={() => openModal(info.userId)}
                >
                  <img src={Report} />
                </button>
              }
            >
              <ListItemText
                sx={{ p: '4px', cursor: 'pointer' }}
                onClick={() => userInfoClick(info.userId)}
              >
                Lv.{info.level} {info.nickname}
              </ListItemText>
              {info.isCertified ? (
                <ListItemIcon
                  sx={{
                    minWidth: '23px',
                    color: 'unset',
                    fontSize: 'larger',
                    p: '4px',
                  }}
                >
                  👑
                </ListItemIcon>
              ) : (
                <></>
              )}
              {info.isBad ? (
                <ListItemIcon
                  sx={{
                    minWidth: '23px',
                    color: 'unset',
                    fontSize: 'larger',
                    p: '1px',
                  }}
                >
                  ☠️
                </ListItemIcon>
              ) : (
                <></>
              )}
            </ListItem>
          ))}
        </List>
      </Demo>
    </Grid>
  );
};
export default ChatParticipantList;
