import React from 'react';
import './backButton.css';

import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';


const BackButton = () => {
  return (
    <Link to="/" className="back-button">
      <AiOutlineArrowLeft className="icon" />
      Zpět
    </Link>
  );
};

export default BackButton;