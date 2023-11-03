import React from 'react';
import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';
import Button from '../components/Button/Button';
import './shoppingDetail.css';
import MemberList from '../components/memberList/memberList';

const ShoppingDetail = () => {
  return (
    <div className="shopping-detail-container">
      <div className="top-section">
        <EditableTitle />
      </div>
      <div className="left-section">
        <Title title="Položky" />
        <ShoppingList />
      </div>
      <div className="right-section">
        <Title title="Vlastník" />
        <MemberList/>
      </div>
      <div className="bottom-section">
        <div className='button-container'>
          <Button className="main-button">Archivovat</Button>
          <Button className="main-button">Smazat</Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingDetail;
