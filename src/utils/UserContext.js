import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authCheck as apiAuthCheck, logout as apiLogout } from './auth';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const { data: authCheck } = useQuery('user', apiAuthCheck, {
    enabled: !!sessionStorage.getItem('user'),
    refetchInterval: 60000,
    retry: false,
    onSuccess: (data) => {
      if (!data.data.isSuccess) {
        logout();
      }
    },
    onError: () => {
      navigate('/signin', { replace: true });
    },
  });

  const { mutate: logout } = useMutation(apiLogout, {
    onSuccess: () => {
      sessionStorage.removeItem('user');
      queryClient.clear();
      setUser(null);
      navigate('/signin', { replace: true });
    },
  });

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        const newUser = JSON.parse(sessionStorage.getItem('user') || 'null');
        setUser(newUser);
        if (!newUser) {
          queryClient.clear();
          setUser(null);
          navigate('/signin', { replace: true });
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate, queryClient]);

  return (
    <UserContext.Provider value={{ user, login, logout, authCheck }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
