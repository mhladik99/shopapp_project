import React, { useState } from 'react';
import { useLanguage } from '../../LanguageContext';
import './languageSwitch.css';

const LanguageSwitch = () => {
  const { language, switchLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage) => {
    switchLanguage(newLanguage);
    setSelectedLanguage(newLanguage);
  };

  return (
    <div className="language-switch-container">
      <button
        className={`language-button ${selectedLanguage === 'cs' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('cs')}
      >
        CZ
      </button>
      <button
        className={`language-button ${selectedLanguage === 'en' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitch;