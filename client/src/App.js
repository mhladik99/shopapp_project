import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main';
import ShoppingDetail from './pages/ShoppingDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';
import ToggleSwitch from './components/toggleSwitch/toggleSwitch';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { LanguageProvider } from './LanguageContext';
import LanguageSwitch from './components/languageSwitch/languageSwitch'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#007BFF',
      },
      secondary: {
        main: '#ff8a65',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#64b5f6',
      },
      secondary: {
        main: '#ff8a65',
      },
    },
    overrides: {
      MuiListItem: {
        container: {
          background: 'black',
        },
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
  <LanguageProvider>
    <NotificationProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        <LanguageSwitch/>
          <ToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} /> 
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/shopping-detail/:id" element={<ShoppingDetail />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </NotificationProvider>
  </LanguageProvider>
  );
};

export default App;