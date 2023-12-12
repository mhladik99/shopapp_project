import React, { useState } from 'react';
import './App.css';
import Main from './pages/Main';
import ShoppingDetail from './pages/ShoppingDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';
import ToggleSwitch from './components/toggleSwitch/toggleSwitch.js';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NotificationProvider>
      <div className={`App ${isDarkMode ? 'dark-mode' :''}`}>
      <ToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shopping-detail/:id" element={<ShoppingDetail />} />
          </Routes>
        </BrowserRouter>
      </div>
    </NotificationProvider>
  );
};

export default App;