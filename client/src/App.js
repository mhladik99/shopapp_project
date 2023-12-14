import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main';
import ShoppingDetail from './pages/ShoppingDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';
import ToggleSwitch from './components/toggleSwitch/toggleSwitch.js';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <NotificationProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : undefined}>
        <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
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
  );
};

export default App;