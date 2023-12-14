import React from 'react';
import './backButton.css';
import { useLanguage } from '../../LanguageContext';

import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';


const BackButton = () => {
  const { language } = useLanguage();
  return (
    <Link to="/" className="back-button">
      <AiOutlineArrowLeft className="icon" />
      {language === 'cs' ? <p>Zpět</p> : <p>Back</p>}
    </Link>
  );
};

export default BackButton;