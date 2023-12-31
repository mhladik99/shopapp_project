import React from 'react';
import { Link } from 'react-router-dom';
import './shoppingCard.css';

import { Paper, Typography, IconButton, Grid } from '@material-ui/core';
import { Close as CloseIcon, BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@material-ui/icons';

const ShoppingCard = ({ id, name, isOwner, isArchived, onDelete, onArchive }) => {
  const handleArchive = (e) => {
    e.preventDefault();
    onArchive();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      {isOwner ? (
        <Link to={`/shopping-detail/${id}`} className="ShoppingCardLink">
          <Paper elevation={3} className={`ShoppingCard ${isArchived ? 'archived' : ''}`}>
            <Typography variant="h5" className="ShoppingCardLink">
              {name}
            </Typography>
            <div className="ShoppingCardButtons">
              {isOwner && (
                <React.Fragment>
                  <IconButton className="ShoppingCardButtons" onClick={handleArchive}>
                    {isArchived ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                  </IconButton>
                  <IconButton className="ShoppingCardButtons" onClick={handleDelete}>
                    <CloseIcon />
                  </IconButton>
                </React.Fragment>
              )}
            </div>
          </Paper>
        </Link>
      ) : (
        <div className="NonClickableCard">
          <Paper elevation={3} className={`ShoppingCard ${isArchived ? 'archived' : ''}`}>
            <Typography variant="h5">
              {name}
            </Typography>
            <div className="ShoppingCardButtons">
            </div>
          </Paper>
        </div>
      )}
    </Grid>
  );
};

export default ShoppingCard;
