import React, { useState } from 'react';
import './editableTitle.css';
import axios from 'axios';
import { useLanguage } from '../../LanguageContext';

import { FaPencilAlt } from 'react-icons/fa';

const EditableTitle = ({ isOwner, title, onTitleChange, shoppingListId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguage();

  const handleEditClick = () => {
    if (isOwner) {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e) => {
    onTitleChange(e.target.value);
    setError('');
  };
  
  const handleSaveClick = async () => {
    if (title.trim() === '') {
      setError(language === 'cs' ? <p>Prosím napište název seznamu</p> : <p>Please write the name of the shopping list</p>);
      return;
    }
  
    try {
      // Make a PATCH request to update only the 'name' property
      await axios.patch(`http://localhost:3001/shoppingLists/${shoppingListId}`, {
        name: title,
      });
    } catch (error) {
      console.error('Error updating shopping list:', error);
    }
  
    setIsEditing(false);
  };

  return (
    <div className="editable-title-container">
      <h1 className="editable-title">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="editable-input"
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleSaveClick} className="editable-button editable-save-button">
            {language === 'cs' ? <p>Uložit</p> : <p>Save</p>}
            </button>
          </div>
        ) : (
          title
        )}
      </h1>
      <div className="editable-buttons">
        {isOwner && !isEditing && (
          <button onClick={handleEditClick} className="editable-button editable-edit-button">
            <FaPencilAlt className="editable-button-icon" /> 
            {language === 'cs' ? <span>Upravit</span> : <span>Edit</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableTitle;
