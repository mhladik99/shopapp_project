import React, { useState } from 'react';
import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';
import Button from '../components/Button/Button';
import './shoppingDetail.css';
import MemberList from '../components/memberList/memberList';
import BackButton from '../components/backButton/backButton';

const ShoppingDetail = () => {
  const ownerInfo = { id: 5, name: 'Petr Krátký', email: 'petr@seznam.cz' };
  const [isOwner, setIsOwner] = useState(true);

  const handleArchivovatClick = () => {
  };

  const handleSmazatClick = () => {
  
  };

  return (
    <div className="shopping-detail-container">
      <div className="top-section">
      <BackButton />
        <EditableTitle isOwner={isOwner} />
      </div>
      <div className="left-section">
        <Title title="Položky" />
        <ShoppingList />
      </div>
      <div className="right-section">
        <Title title="Vlastník" />
        <MemberList ownerInfo={ownerInfo} isOwner={isOwner} setIsOwner={setIsOwner} />
      </div>
      <div className="bottom-section">
        {isOwner && (
          <div className='button-container'>
            <Button className="main-button" onClick={handleArchivovatClick}>
              Archivovat
            </Button>
            <Button className="main-button" onClick={handleSmazatClick}>
              Smazat
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingDetail;

