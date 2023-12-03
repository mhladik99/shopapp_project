import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button as MaterialUIButton } from '@material-ui/core';

const ConfirmationDialog = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Potvrzení</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <MaterialUIButton onClick={onClose} color="primary">
          Zrušit
        </MaterialUIButton>
        <MaterialUIButton onClick={onConfirm} color="primary">
          Potvrdit
        </MaterialUIButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;