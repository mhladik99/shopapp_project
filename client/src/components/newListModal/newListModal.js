import React, { useState } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button as MaterialUIButton,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Add as AddIcon, Clear as DeleteIcon } from '@material-ui/icons';
import Select from 'react-select';

const NewListModal = ({ open, onClose, onCreate }) => {
  const initialFormState = {
    listName: '',
    selectedMembers: [],
    product: '',
    addedProducts: [],
    listNameError: '',
    productError: '',
  };

  const [formState, setFormState] = useState({ ...initialFormState });

  const existingMembers = [
    { id: 1, name: 'Michal Hladík', email: 'michal@seznam.cz' },
    { id: 2, name: 'Karel Kravčík', email: 'karel@seznam.cz' },
    { id: 3, name: 'Petra Novotná', email: 'petra@seznam.cz' },
    { id: 4, name: 'Tereza Rychlá', email: 'tereza@seznam.cz' },
  ];

  const handleCreate = () => {
    if (!formState.listName.trim()) {
      setFormState({
        ...formState,
        listNameError: 'Prosím napište název seznamu',
      });
      return;
    }

    if (formState.addedProducts.length === 0) {
      setFormState({
        ...formState,
        productError: 'Prosím přidejte alespoň 1 produkt',
      });
      return;
    }

    const newList = {
      listName: formState.listName,
      addedProducts: formState.addedProducts,
      selectedMembers: formState.selectedMembers.map((member) => member.value),
    };
    onCreate(newList);
    onClose();
    setFormState({ ...initialFormState });
  };

  const handleAddProduct = () => {
    if (!formState.product.trim()) {
      setFormState({
        ...formState,
        productError: 'Prosím napište název produktu',
      });
      return;
    }

    setFormState({
      ...formState,
      addedProducts: [...formState.addedProducts, formState.product],
      product: '',
      productError: '',
    });
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...formState.addedProducts];
    updatedProducts.splice(index, 1);
    setFormState({
      ...formState,
      addedProducts: updatedProducts,
    });
  };

  const handleModalClose = () => {
    onClose();
    setFormState({ ...initialFormState });
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      PaperProps={{
        style: {
          height: '80vh',
          maxWidth: 'md',
        },
      }}
    >
      <DialogTitle>Nový nákupní seznam</DialogTitle>
      <DialogContent>
        <TextField
          label="Název seznamu"
          value={formState.listName}
          onChange={(e) => {
            setFormState({
              ...formState,
              listName: e.target.value,
              listNameError: '',
            });
          }}
          fullWidth
          margin="normal"
          error={!!formState.listNameError}
          helperText={formState.listNameError}
        />
        <TextField
          label="Přidat produkt"
          value={formState.product}
          onChange={(e) => {
            setFormState({
              ...formState,
              product: e.target.value,
              productError: '',
            });
          }}
          fullWidth
          margin="normal"
          error={!!formState.productError}
          helperText={formState.productError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleAddProduct}>
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List dense>
          {formState.addedProducts.map((addedProduct, index) => (
            <ListItem key={index} style={{ padding: 0 }}>
              <ListItemText
                primary={addedProduct}
                style={{ margin: 0, padding: 0 }}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => handleDeleteProduct(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Select
          options={existingMembers.map((member) => ({
            value: member.id,
            label: member.name,
          }))}
          isMulti
          value={formState.selectedMembers}
          onChange={(selectedOptions) =>
            setFormState({
              ...formState,
              selectedMembers: selectedOptions,
            })
          }
          placeholder="Přidat členy"
        />
      </DialogContent>
      <DialogActions>
        <MaterialUIButton onClick={handleModalClose} color="primary">
          Zrušit
        </MaterialUIButton>
        <MaterialUIButton onClick={handleCreate} color="primary">
          Vytvořit
        </MaterialUIButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewListModal;