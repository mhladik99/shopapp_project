import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import ShoppingCard from '../components/shoppingCard/shoppingCard';
import Button from '../components/Button/Button';
import NewListModal from '../components/newListModal/newListModal';
import ConfirmationDialog from '../components/confirmationDialog/confirmationDialog';
import NotificationBar from '../components/notificationBar/notificationBar';
import { useNotification } from '../NotificationContext.js'
import { useLanguage } from '../LanguageContext';

const Main = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { showNotification } = useNotification();
  const { language } = useLanguage();

  useEffect(() => {
    // Fetch shopping lists from the server using Axios
    const fetchShoppingLists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/shoppingLists');
        setShoppingLists(response.data);
      } catch (error) {
        console.error('Error fetching shopping lists:', error);
      }
    };

    fetchShoppingLists();
  }, []);

  const handleNewListClick = () => {
    setModalOpen(true);
  };

  const handleArchiveClick = () => {
    setViewArchived((prevViewArchived) => !prevViewArchived);
  };

  const handleCardArchive = async (listId) => {
    try {
      const currentList = visibleShoppingLists.find((list) => list.id === listId);
      const updatedList = { archived: !currentList.archived };

      const response = await axios.patch(
        `http://localhost:3001/shoppingLists/${listId}`,
        updatedList
      );

      if (response.status !== 200) {
        throw new Error(`Failed to update shopping list: ${response.statusText}`);
      }

      // Update the state to reflect the change
      setShoppingLists((prevShoppingLists) =>
        prevShoppingLists.map((list) =>
          list.id === listId ? { ...list, archived: !list.archived } : list
        )
      );
    } catch (error) {
      console.error('Error updating shopping list:', error.message);
    }
  };

  const handleCardDelete = (listId) => {
    setSelectedCard(listId);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/shoppingLists/${selectedCard}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.status === 200) {
        throw new Error(`Failed to delete shopping list: ${response.statusText}`);
      }
  
      // Use the showNotification function from the context to display the notification
      showNotification(
        language === 'cs' ? <p>Nákupní seznam byl smazán.</p> : <p>The shopping list has been deleted.</p>
      );
  
      setShoppingLists((prevShoppingLists) =>
        prevShoppingLists.filter((list) => list.id !== selectedCard)
      );
  
      setSelectedCard(null);
    } catch (error) {
      console.error('Error deleting shopping list:', error.message);
    } finally {
      setConfirmationDialogOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setSelectedCard(null);
    setConfirmationDialogOpen(false);
  };

  const handleCreateList = async (newListData) => {
    try {
      // Make a POST request to create a new shopping list
      const response = await axios.post('http://localhost:3001/shoppingLists', {
        name: newListData.listName,
        archived: false,
        isOwner: true,
      });
  
      const newShoppingList = response.data;

      const ownerResponse = await axios.post('http://localhost:3001/owners', {
        name: 'Petr Krátký', // replace with the actual logged owner ID
        email: 'petr@seznam.cz',
        shoppingListId: newShoppingList.id,
      });
  
      // Assuming the owner API returns the added owner with an ID
      const addedOwner = ownerResponse.data;
  
      console.log('Added owner:', addedOwner);
  
      // Use the ID of the newly created shopping list to add products
      await Promise.all(
        newListData.addedProducts.map(async (productName) => {
          const productData = {
            name: productName,
            completed: false,
            shoppingListId: newShoppingList.id,
          };
  
          // Make a POST request to add a product to the shopping list
          const productResponse = await axios.post(`http://localhost:3001/shoppingLists/${newShoppingList.id}/products`, productData);
  
          // Assuming the product API returns the added product with an ID
          const addedProduct = productResponse.data;
  
          console.log('Added product:', addedProduct);
        })
      );

      // Use the ID of the newly created shopping list to add members
      await Promise.all(
        newListData.selectedMembers.map(async (selectedMember) => {
          const memberData = {
            name: selectedMember.name,
            email: selectedMember.email,
            shoppingListId: newShoppingList.id,
          };
  
          // Make a POST request to add a product to the shopping list
          const memberResponse = await axios.post(`http://localhost:3001/shoppingLists/${newShoppingList.id}/members`, memberData);
          
          console.log('Selected Member:', selectedMember);
  
          // Assuming the product API returns the added product with an ID
          const addedMember = memberResponse.data;
  
          // You can handle the added product as needed
          console.log('Added member:', addedMember);
        })
      );
  
      setShoppingLists((prevShoppingLists) => [...prevShoppingLists, newShoppingList]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating shopping list:', error);
    }
  };

  const visibleShoppingLists = viewArchived
    ? shoppingLists.filter((list) => list.archived)
    : shoppingLists;

  return (
    <div className='container'>
      <div className='button-container'>
        <div className="button-group">
          <Button className="main-button" onClick={handleNewListClick}>
          {language === 'cs' ? <p>+ Nový nákupní seznam</p> : <p>+ New shopping list</p>}
          </Button>
          <Button className="main-button archive-button" onClick={handleArchiveClick}>
            {viewArchived ? (
              language === 'cs' ? <p>Zobrazit všechny</p> : <p>View all</p>
                ) : (
              language === 'cs' ? <p>Archivované</p> : <p>Archived</p>
                )}
          </Button>
        </div>
      </div>

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {visibleShoppingLists.map((list, index) => (
          <ShoppingCard
            key={index}
            id={list.id}
            name={list.name}
            isOwner={list.isOwner}
            isArchived={list.archived}
            onDelete={() => handleCardDelete(list.id)}
            onArchive={() => handleCardArchive(list.id)}
          />
        ))}
      </Grid>

      {/* Display NotificationBar */}
      <NotificationBar />

      {/* Confirmation Dialog for Delete */}
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={language === 'cs' ? <p>Opravdu chcete tento nákupní seznam smazat?</p> : <p>Do you really want to delete this shopping list?</p>}
      />

      {/* NewListModal component */}
      <NewListModal open={isModalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateList} />
    </div>
  );
};

export default Main;
