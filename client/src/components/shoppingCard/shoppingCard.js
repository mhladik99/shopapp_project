import React from 'react';
import './shoppingCard.css';

import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import { Close as CloseIcon, BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';

const ShoppingCard = ({ name, isOwner, isArchived, onDelete, onArchive }) => {
  const handleArchive = () => {
    onArchive();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} className={`ShoppingCard ${isArchived ? 'archived' : ''}`}>
        <Typography variant="h5" className="ShoppingCardTitle">
          {name}
        </Typography>
        <div className="ShoppingCardButtons">
          {isOwner && (
            <React.Fragment>
              <IconButton className="ShoppingCardButton" onClick={handleArchive}>
                {isArchived ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton className="ShoppingCardButton" onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default ShoppingCard;