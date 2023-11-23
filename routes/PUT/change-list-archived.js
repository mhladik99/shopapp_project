const express = require('express');
const router = express.Router();
const { shoppingLists } = require('../../data');

// Update the archived property of a specific shopping list
router.put('/shopping-lists/:listId/archive', (req, res) => {
  const { listId } = req.params;
  const { archived } = req.body;

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find((list) => list.id === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Update the archived property
  shoppingList.archived = archived;

  res.json({ message: `Shopping list with ID ${listId} has been updated.` });
});

module.exports = router;