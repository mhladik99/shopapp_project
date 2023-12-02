import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button as MaterialUIButton } from '@material-ui/core';
import ShoppingCard from '../components/shoppingCard/shoppingCard';
import Button from '../components/Button/Button';
import NewListModal from '../components/newListModal/newListModal';

const Main = () => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [viewArchived, setViewArchived] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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
      const updatedList = { ...currentList, archived: !currentList.archived };

      const response = await axios.put(
        `http://localhost:3001/shoppingLists/${listId}`,
        updatedList
      );

      if (!response.status === 200) {
        throw new Error(`Failed to update shopping list: ${response.statusText}`);
      }

      // Update the state to reflect the change
      setShoppingLists((prevShoppingLists) =>
        prevShoppingLists.map((list) =>
          list.id === listId ? updatedList : list
        )
      );
    } catch (error) {
      console.error('Error updating shopping list:', error.message);
    }
  };

  const handleCardDelete = (listId) => {
    setSelectedCard(listId);
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

      // Update shoppingLists state to reflect the deletion
      setShoppingLists((prevShoppingLists) =>
        prevShoppingLists.filter((list) => list.id !== selectedCard)
      );

      // Reset selectedCard state
      setSelectedCard(null);
    } catch (error) {
      console.error('Error deleting shopping list:', error.message);
    }
  };

  const handleCancelDelete = () => {
    setSelectedCard(null);
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

      {/* Confirmation Dialog for Delete */}
      <Dialog open={!!selectedCard} onClose={handleCancelDelete}>
        <DialogTitle>Potvrzení smazání</DialogTitle>
        <DialogContent>
          Opravdu chcete tento nákupní seznam smazat?
        </DialogContent>
        <DialogActions>
          <MaterialUIButton onClick={handleCancelDelete} color="primary">
            Zrušit
          </MaterialUIButton>
          <MaterialUIButton onClick={handleConfirmDelete} color="primary">
            Smazat
          </MaterialUIButton>
        </DialogActions>
      </Dialog>

      {/* NewListModal component */}
      <NewListModal open={isModalOpen} onClose={() => setModalOpen(false)} onCreate={handleCreateList} />
    </div>
  );
};

export default Main;