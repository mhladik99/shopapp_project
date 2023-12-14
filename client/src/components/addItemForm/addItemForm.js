import React, { useState } from 'react';
import Button from '../Button/Button';
import { useLanguage } from '../../LanguageContext';

const AddItemForm = ({ addProduct }) => {
  const [text, setText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const { language } = useLanguage();

  const handleInputChange = (e) => {
    setText(e.target.value);
    setIsEmpty(e.target.value.trim() === '');
  };

  const handleSubmit = () => {
    if (text.trim() === '') {
      setIsEmpty(true);
    } else {
      addProduct(text);
      setText('');
      setIsFormVisible(false);
      setIsEmpty(false); 
    }
  };

  return (
    <div className="add-item-form-container">
      {isFormVisible ? (
        <div>
          <input
            className={`add-item-input ${isEmpty ? 'error' : ''}`}
            type="text"
            value={text}
            onChange={handleInputChange}
            style={{ width: '200px', marginRight: '10px'}}
          />
          {isEmpty && <p className="error-message">{language === 'cs' ? <p>Prosím napište název produktu</p> : <p>Please write the name of the product</p>}</p>}
          <Button className="add-item-button" onClick={handleSubmit}>
          {language === 'cs' ? <p>Přidat</p> : <p>Add</p>}
          </Button>
        </div>
      ) : (
        <Button className="toggle-button" onClick={() => setIsFormVisible(true)}>
          {language === 'cs' ? <p>+ Přidat položku</p> : <p>+ Add item</p>}
        </Button>
      )}
    </div>
  );
};

export default AddItemForm;