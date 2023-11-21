import React, { useState } from 'react';
import Button from '../Button/Button';

const AddItemForm = ({ addProduct }) => {
  const [text, setText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

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
          />
          {isEmpty && <p className="error-message">Prosím napište název produktu</p>}
          <Button className="add-item-button" onClick={handleSubmit}>
            Přidat
          </Button>
        </div>
      ) : (
        <Button className="toggle-button" onClick={() => setIsFormVisible(true)}>
          + Přidat položku
        </Button>
      )}
    </div>
  );
};

export default AddItemForm;