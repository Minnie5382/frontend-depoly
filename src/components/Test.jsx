import React from 'react';
import axios from 'axios';


const Main = () => {
  const handleClick = () => {
    axios.get('http://localhost:4000/test')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('에러 발생:', error);
      });
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: `4px 1em`,
    cursor: 'pointer',
    borderRadius: '8px'
  };

  const MessageStyle = {
    color: 'white',
  };

  return (
    <div>
      <button onClick={handleClick} style={buttonStyle}>
        백엔드 테스트 요청 보내기
        </button>
    <p style={MessageStyle}>결과는 console 창을 확인하세요! 두구두구두...</p>
    </div>
  );
};

export default Main;
