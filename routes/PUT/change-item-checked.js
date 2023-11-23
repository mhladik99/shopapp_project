const express = require('express');
const router = express.Router();
const { shoppingLists, items } = require('../../data');

// Update the itemChecked property of a specific item
router.put('/shopping-lists/:listId/items/:itemId', (req, res) => {
  const { listId, itemId } = req.params;
  const { itemChecked } = req.body;

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find((list) => list.id === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Find the item by ID
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Update the itemChecked property
  item.itemChecked = itemChecked;

  res.json({ message: `Item with ID ${itemId} in the shopping list with ID ${listId} has been updated.` });
});

module.exports = router;