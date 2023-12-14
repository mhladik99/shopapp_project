import React from 'react';
import { useLanguage } from '../../LanguageContext';

const LanguageSwitch = () => {
  const { language, switchLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    switchLanguage(newLanguage);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('cs')}>Czech</button>
      <button onClick={() => handleLanguageChange('en')}>English</button>
    </div>
  );
};

export default LanguageSwitch;