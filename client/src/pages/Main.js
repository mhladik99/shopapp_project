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

  const handleCardArchive = (listName) => {
    setShoppingLists((prevShoppingLists) =>
      prevShoppingLists.map((list) =>
        list.name === listName ? { ...list, archived: !list.archived } : list
      )
    );
  };

  const handleCardDelete = (listName) => {
    setSelectedCard(listName);
  };

  const handleConfirmDelete = () => {
    setShoppingLists((prevShoppingLists) =>
      prevShoppingLists.filter((list) => list.name !== selectedCard)
    );
    setSelectedCard(null);
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
        items: [],
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
            name={list.name}
            isOwner={list.isOwner}
            isArchived={list.archived}
            onDelete={() => handleCardDelete(list.name)}
            onArchive={() => handleCardArchive(list.name)}
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