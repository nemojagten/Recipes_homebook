import React, { useContext, useState } from 'react';
import { useLocalStorageState } from '../../hooks/useLocalStorageState/useLocalStorageState';

const defaultAuthState = {
  token: null,
  user: null,
};

export const AuthContext = React.createContext(null);

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useLocalStorageState(defaultAuthState);
  function login(token, user) {
    setAuth({
      token,
      user,
    });
  }

  function logout() {
    setAuth(defaultAuthState);
  }

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuthContext() {
  
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      'Please always use the useAuthContext Hook inside the AuthContextProvider component or its descendents.'
    );
  }

  return ctx;
}
