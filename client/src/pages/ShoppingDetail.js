import React from 'react';
import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';
import Button from '../components/Button/Button';

const ShoppingDetail = () => {
  return (
    <div>
      <EditableTitle />
      <Title title="Položky" />
      <ShoppingList/>
        <div className='button-container'>
          <Button className="main-button">Archivovat</Button>
          <Button className="main-button">Smazat</Button>
        </div>
    </div>
  );
};

export default ShoppingDetail;