import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import ShoppingCard from '../components/shoppingCard/shoppingCard';
import Button from '../components/Button/Button';
import NewListModal from '../components/newListModal/newListModal';
import ConfirmationDialog from '../components/confirmationDialog/confirmationDialog';
import NotificationBar from '../components/notificationBar/notificationBar';
import { useNotification } from '../NotificationContext.js'

const Main = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { showNotification } = useNotification();

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
      showNotification('Nákupní seznam byl smazán.');
  
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
        members: newListData.selectedMembers,
        archived: false,
        isOwner: true,
        products: [],
      });

      setShoppingLists((prevShoppingLists) => [...prevShoppingLists, response.data]);
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
        <Button className="main-button" onClick={handleNewListClick}>
          + Nový nákupní seznam
        </Button>
        <Button className="main-button" onClick={handleArchiveClick}>
          {viewArchived ? 'Zobrazit všechny' : 'Archivované'}
        </Button>
      </div>

      <Grid container spacing={3}>
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
        message="Opravdu chcete tento nákupní seznam smazat?"
      />

      {/* NewListModal component */}
      <NewListModal open={isModalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateList} />
    </div>
  );
};

export default Main;
