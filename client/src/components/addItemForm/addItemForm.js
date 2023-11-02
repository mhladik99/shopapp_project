import React, { useState } from 'react';
import Button from '../Button/Button';

const AddItemForm = ({ addProduct }) => {
  const [text, setText] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    addProduct(text);
    setText('');
    setIsFormVisible(false);
  };

  return (
    <div className="add-item-form-container">
      {isFormVisible ? (
        <div>
          <input
            className="add-item-input"
            type="text"
            value={text}
            onChange={handleInputChange}
          />
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