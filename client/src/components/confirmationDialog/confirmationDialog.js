import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MaterialUIButton } from '@material-ui/core';
import { useLanguage } from '../../LanguageContext';

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{language === 'cs' ? <p>Potvrzení</p> : <p>Confirmation</p>}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <MaterialUIButton onClick={onClose} color="primary">
        {language === 'cs' ? <p>Zrušit</p> : <p>Cancel</p>}
        </MaterialUIButton>
        <MaterialUIButton onClick={onConfirm} color="primary">
        {language === 'cs' ? <p>Potvrdit</p> : <p>Confirm</p>}
        </MaterialUIButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;