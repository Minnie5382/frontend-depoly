import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useLocation } from 'react-router-dom';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useUser();
  const location = useLocation();
  const userId = user?.result?.userId;

  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === '/chat') {
      const connectWebSocket = () => {
        const ws = new WebSocket(
          `wss://k7f10638b4382a.user-app.krampoline.com/chat?userId=${userId}`
        );

        ws.onopen = () => {
          console.log('Connected to WebSocket');
        };

        ws.onmessage = event => {
          console.log('Message from WebSocket:', event.data);
        };

        ws.onerror = error => {
          console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setTimeout(connectWebSocket, 1000 * 60);
        };

        setSocket(ws);
      };

      connectWebSocket();
    }
  }, [location.pathname, userId]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
