import React, { useState } from 'react';
import './Main.css';

import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button as MaterialUIButton } from '@material-ui/core';
import ShoppingCard from '../components/shoppingCard/shoppingCard';
import Button from '../components/Button/Button';
import NewListModal from '../components/newListModal/newListModal';

const Main = () => {
  const [shoppingLists, setShoppingLists] = useState([
    { name: 'Nákupní seznam #1', archived: false },
    { name: 'Nákupní seznam #2', isOwner: true, archived: false },
    { name: 'Nákupní seznam #3', isOwner: true, archived: false },
    { name: 'Nákupní seznam #4', archived: false },
    { name: 'Nákupní seznam #5', archived: false },
    { name: 'Nákupní seznam #6', archived: false },
  ]);

  const [viewArchived, setViewArchived] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleCreateList = (newListData) => {
    setShoppingLists((prevShoppingLists) => [
      ...prevShoppingLists,
      { name: newListData.listName, members: newListData.selectedMembers, archived: false, isOwner: true },
    ]);
    setModalOpen(false);
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