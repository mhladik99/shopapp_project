import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../../LanguageContext';

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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: 'black',
  }),
}

const NewListModal = ({ open, onClose, onCreate }) => {
  const { language } = useLanguage();
  const initialFormState = {
    listName: '',
    selectedMembers: [],
    product: '',
    addedProducts: [],
    listNameError: '',
    productError: '',
  };

  const [formState, setFormState] = useState({ ...initialFormState });
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchMemberList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/members');
        setMemberList(response.data);
      } catch (error) {
        console.error('Error fetching member list:', error);
      }
    };

    fetchMemberList();
  }, []);

  const handleCreate = () => {
    if (!formState.listName.trim()) {
      setFormState({
        ...formState,
        listNameError: (language === 'cs' ? <p>Prosím napište název seznamu</p> : <p>Please write the name of the list</p>)
      });
      return;
    }

    if (formState.addedProducts.length === 0) {
      setFormState({
        ...formState,
        productError: (language === 'cs' ? <p>Prosím přidejte alespoň 1 produkt</p> : <p>Please add at least 1 item</p>)
      });
      return;
    }

    const newList = {
      listName: formState.listName,
      addedProducts: formState.addedProducts,
      selectedMembers: formState.selectedMembers?.map((member) => ({
        id: member.value,
        name: member.label,
        email: member.email, // Add this line if available in your options
      })),
    };
    onCreate(newList);
    onClose();
    setFormState({ ...initialFormState });
  };

  const handleAddProduct = () => {
    if (!formState.product.trim()) {
      setFormState({
        ...formState,
        productError: (language === 'cs' ? <p>Prosím napište název produktu</p> : <p>Please write the name of the item</p>)
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
      <DialogTitle>{language === 'cs' ? <p>Nový nákupní seznam</p> : <p>New shopping list</p>}</DialogTitle>
      <DialogContent>
        <TextField
          label={language === 'cs' ? <p>Název seznam</p> : <p>Shopping list name</p>}
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
          label={language === 'cs' ? <p>Přidat produkt</p> : <p>Add item</p>}
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
            <ListItem key={index} style={{ padding: 0 }} >
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
        <Select styles={customStyles}
          options={memberList?.filter(
            (member, index, self) =>
              self.findIndex((m) => m.email === member.email) === index
          ).map((member) => ({
            value: member.id,
            label: member.name,
            email: member.email,
          }))}
          isMulti
          value={formState.selectedMembers}
          onChange={(selectedOptions) =>
            setFormState({
              ...formState,
              selectedMembers: selectedOptions,
            })
          }
          placeholder={language === 'cs' ? <p>Přidat členy</p> : <p>Add members</p>}
        />
      </DialogContent>
      <DialogActions>
        <MaterialUIButton onClick={handleModalClose} color="primary">
        {language === 'cs' ? <p>Zrušit</p> : <p>Cancel</p>}
        </MaterialUIButton>
        <MaterialUIButton onClick={handleCreate} color="primary">
        {language === 'cs' ? <p>Vytvořit</p> : <p>Create</p>}
        </MaterialUIButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewListModal;