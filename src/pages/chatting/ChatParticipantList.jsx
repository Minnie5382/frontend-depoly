import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Report from '../../assets/free-icon-siren-763421.png';
import style from './chattingRoom/ChatRoom.module.css';

const participant = [
  {
    userName: '알렉스',
  },
  {
    userName: '미나',
  },
  {
    userName: '유진',
  },
  {
    userName: '사라',
  },
  {
    userName: '알렉스',
  },
  {
    userName: '미나',
  },
  {
    userName: '유진',
  },
  {
    userName: '사라',
  },
  {
    userName: '알렉스',
  },
  {
    userName: '미나',
  },
  {
    userName: '유진',
  },
  {
    userName: '사라',
  },
  {
    userName: '알렉스',
  },
  {
    userName: '미나',
  },
  {
    userName: '유진',
  },
  {
    userName: '사라',
  },
];

const ChatParticipantList = ({ setOpen }) => {
  const Demo = styled('div')({
    color: '#fff',
  });

  const openModal = () => {
    setOpen(true);
  };

  return (
    <Grid item xs={12} md={6}>
      <Demo>
        <List sx={{ pt: 0, pb: 0 }}>
          {participant.map((value) => (
            <ListItem
              sx={{ pr: 14 }}
              secondaryAction={
                <button className={style.reportBtn} onClick={openModal}>
                  <img src={Report} />
                </button>
              }
            >
              <ListItemText primary={value.userName} />
            </ListItem>
          ))}
        </List>
      </Demo>
    </Grid>
  );
};
export default ChatParticipantList;
