/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');

    if (storedAuth) {
      const storedAuthData = JSON.parse(storedAuth);
      console.log( storedAuthData?.value?.email);  // Output: "chayan@check.com"
       console.log( storedAuthData?.value?.role); 
      if (storedAuthData.expiry && new Date().getTime() > storedAuthData.expiry) {
      localStorage.removeItem('auth');
      return {};
      }
      else{
    return storedAuthData.value
      }
    }
    else
    {
      return {};
    }
  });

  useEffect(() => {
    function setLocalStorageWithExpiry(key, value, ttl) {
      const now = new Date();
      const item = {
        value: value, // Store the object directly
        expiry: now.getTime() + ttl, 
      };
      localStorage.setItem(key, JSON.stringify(item));
    }
    const ttl = 24 * 60 * 60 * 1000;
    setLocalStorageWithExpiry('auth', auth, ttl); // No more JSON.stringify(auth)
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthContext;