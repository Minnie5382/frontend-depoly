import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { authCheck as apiAuthCheck, logout as apiLogout } from './auth';

export const UserContext = createContext(null);

const authPaths = ['/auth/check', '/signin', '/signup'];

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('user');
    const flush = sessionStorage.getItem('flush');
    if (flush) {
      sessionStorage.removeItem('flush');
      return null;
    }
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const { mutate: logout } = useMutation(apiLogout, {
    onSuccess: () => {
      sessionStorage.removeItem('user');
      sessionStorage.setItem('flush', 'true');
      setUser(null);
      queryClient.clear();
      navigate('/signin', { replace: true });
    },
  });

  const { data: authCheck } = useQuery('user', apiAuthCheck, {
    enabled: !!user,
    refetchInterval: 60000,
    retry: false,
    onError: (data) => {
      sessionStorage.removeItem('user');
      setUser(null);
      if (data.response.data.isSuccess === false) {
        const flush = sessionStorage.getItem('flush');
        if (!flush) {
          sessionStorage.setItem('flush', 'true');
          navigate('/signin', { replace: true });
        }
      }
    },
  });

  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    const flush = sessionStorage.getItem('flush');
    if (!flush && !savedUser && !authPaths.includes(location.pathname)) {
      logout();
    }
  }, [logout, location.pathname]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('flush');
    }
  }, [user]);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'user') {
        const newUser = JSON.parse(sessionStorage.getItem('user') || 'null');
        setUser(newUser);
        if (!newUser && !authPaths.includes(location.pathname)) {
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
  }, [navigate, queryClient, location.pathname]);

  return (
    <UserContext.Provider value={{ user, login, logout, authCheck }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
