import React, { useState } from 'react';
import './editableTitle.css';

import { FaPencilAlt } from 'react-icons/fa';

const EditableTitle = ({ isOwner }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Název nákupního seznamu");

  const handleEditClick = () => {
    if (isOwner) {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSaveClick = () => {
    if (title.trim() === '') {
      setTitle("Bez názvu");
    }
    setIsEditing(false);
  };

  return (
    <div className="editable-title-container">
      <h1 className="editable-title">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="editable-input"
          />
        ) : (
          title
        )}
      </h1>
      <div className="editable-buttons">
        {isOwner ? (
          isEditing ? (
            <button onClick={handleSaveClick} className="editable-button editable-save-button">
              Uložit
            </button>
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

