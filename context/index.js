import { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer } from './authReducer';
import { parseCookies, destroyCookie } from 'nookies';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const GlobalContext = createContext();

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
};

const GlobalProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);

  const router = useRouter();

  const logout = async () => {
    destroyCookie(null, 'user');
    dispatchAuth({ type: 'AUTH_RESET' });
    router.push('/');
  };

  useEffect(() => {
    dispatchAuth({ type: 'AUTH_LOADING' });
    async function loadUserFromCookies() {
      const { user } = parseCookies();

      if (!!user) {
        auth.user = JSON.parse(user);
        dispatchAuth({
          type: 'LOGIN_SUCCESS',
          payload: { user: auth.user },
        });
      } else {
        dispatchAuth({ type: 'LOGIN_FAILED' });
      }
    }
    loadUserFromCookies();
  }, []);

  return (
    <GlobalContext.Provider value={{ auth, dispatchAuth, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useAuth = () => useContext(GlobalContext);

export default GlobalProvider;
