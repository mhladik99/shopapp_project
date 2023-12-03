import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './shoppingDetail.css';

import EditableTitle from '../components/editableTitle/editableTitle';
import Title from '../components/Title/Title';
import ShoppingList from '../components/shoppingList/shoppingList';
import Button from '../components/Button/Button';
import MemberList from '../components/memberList/memberList';
import BackButton from '../components/backButton/backButton';

const ShoppingDetail = () => {
  const { id } = useParams();
  const [shoppingList, setShoppingList] = useState(null);
  const ownerInfo = { id: 5, name: 'Petr Krátký', email: 'petr@seznam.cz' };
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3001/shoppingLists/${id}`);
        setShoppingList(response.data);
        
      } catch (error) {
        
        console.error('Error fetching shopping list:', error);
      }
    };

    fetchShoppingList();
  }, [id]);

  const handleArchivovatClick = async () => {
    try {
      const newArchivedState = !shoppingList.archived;
  
      await axios.patch(`http://localhost:3001/shoppingLists/${id}`, {
        archived: newArchivedState,
      });
  
      // Update the local state to reflect the change
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        archived: newArchivedState,
      }));
    } catch (error) {
      console.error('Error updating shopping list:', error);
    }
  };

  const handleSmazatClick = () => {
  
  };

  return (
    <div className="shopping-detail-container">
      <div className="top-section">
      <BackButton />
      <EditableTitle
          isOwner={isOwner}
          title={shoppingList ? shoppingList.name : ''}
          onTitleChange={(newTitle) => {
            setShoppingList({ ...shoppingList, name: newTitle });
          }}
          shoppingListId={id}
        />
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
            <Button className={`main-button ${shoppingList && shoppingList.archived ? 'archived' : ''}`}
              onClick={handleArchivovatClick} >
              {shoppingList && shoppingList.archived ? 'Odarchivovat' : 'Archivovat'}
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
