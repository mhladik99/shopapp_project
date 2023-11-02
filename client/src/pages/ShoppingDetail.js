import React from 'react';
import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';

const ShoppingDetail = () => {
  return (
    <div>
      <EditableTitle />
      <Title title="Položky" />
      <ShoppingList/>
    </div>
  );
};

export default ShoppingDetail;