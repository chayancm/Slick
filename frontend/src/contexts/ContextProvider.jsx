/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};
function getIsLoggedInFromLocalStorage() {
  const storedValue = localStorage.getItem('isLogedIn');

  if (storedValue) {
    const storedData = JSON.parse(storedValue);
    console.log(storedData.value);
    if (storedData.expiry && new Date().getTime() > storedData.expiry) {
      localStorage.removeItem('isLogedIn'); 
      return false; 
    } else {
      return storedData.value; 
    }
  } else {
    return false; 
  }
}


// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [isLogedin,setIsLogedIn]=useState(getIsLoggedInFromLocalStorage())
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isClicked, setIsClicked] = useState(initialState);
  const [isLoading,setIsLoading]=useState(false);
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings,isLogedin,setIsLogedIn,setIsLoading,isLoading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);