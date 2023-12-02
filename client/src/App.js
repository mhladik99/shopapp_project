import React from 'react';
import './App.css';
import Main from './pages/Main';
import ShoppingDetail from './pages/ShoppingDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shopping-detail/:id" element={<ShoppingDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;