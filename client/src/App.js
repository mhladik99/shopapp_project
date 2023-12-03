import React from 'react';
import './App.css';
import Main from './pages/Main';
import ShoppingDetail from './pages/ShoppingDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext';

const App = () => {
  return (
    <NotificationProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/shopping-detail/:id" element={<ShoppingDetail />} />
        </Routes>
    </BrowserRouter>
    </NotificationProvider>
  );
};

export default App;