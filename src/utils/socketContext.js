import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useLocation, useParams, useNavigate } from 'react-router-dom';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = user?.result?.userId;

  const confirmAlert = () => {
    const isConfirmed = window.confirm(
      '로그인이 되어있지 않습니다. 로그인 하시겠습니까?'
    );
    if (isConfirmed) {
      navigate('/signin');
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (
      location.pathname === '/chat' ||
      location.pathname === `/chat/chatRoom${params.roomId}`
    ) {
      if (!userId) {
        return confirmAlert();
      } // userId가 없으면 알럿으로 로그인이나 메인이동
      const connectWebSocket = () => {
        const ws = new WebSocket(
          `${process.env.REACT_APP_API_WEBSOCKET_URL}${userId}`
        );

        ws.onopen = () => {};

        ws.onmessage = (event) => {
          const response = JSON.parse(event.data);
          if (response.type === 'QUIT') {
            window.location.reload();
            // ws.onopen();
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          setTimeout(connectWebSocket, 1000);
        };
        setSocket(ws);
      };

      connectWebSocket();
    }
  }, [location.pathname, params.roomId, userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
