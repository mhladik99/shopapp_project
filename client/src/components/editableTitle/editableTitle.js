import React, { useState } from 'react';
import './editableTitle.css';
import axios from 'axios';

import { FaPencilAlt } from 'react-icons/fa';

const EditableTitle = ({ isOwner, title, onTitleChange, shoppingListId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

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
      setError('Prosím napište název seznamu');
      return;
    }
  
    try {
      // Make a GET request to fetch the current shopping list
      const response = await axios.get(`http://localhost:3001/shoppingLists/${shoppingListId}`);
      const currentShoppingList = response.data;
  
      // Update only the name property
      const updatedShoppingList = {
        ...currentShoppingList,
        name: title,
      };
  
      // Make a PUT request to update the shopping list
      await axios.put(`http://localhost:3001/shoppingLists/${shoppingListId}`, updatedShoppingList);
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
          </div>
        ) : (
          title
        )}
      </h1>
      <div className="editable-buttons">
        {isOwner ? (
          isEditing ? (
            <>
              <button onClick={handleSaveClick} className="editable-button editable-save-button">
                Uložit
              </button>
            </>
          ) : (
            <button onClick={handleEditClick} className="editable-button editable-edit-button">
              <FaPencilAlt className="editable-button-icon" /> Upravit
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default EditableTitle;
