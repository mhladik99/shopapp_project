import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai'; // Using an arrow icon from react-icons
import './backButton.css';

const BackButton = () => {
  return (
    <Link to="/" className="back-button">
      <AiOutlineArrowLeft className="icon" />
      Zpět
    </Link>
  );
};

export default BackButton;