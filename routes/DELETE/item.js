const express = require('express');
const router = express.Router();
const { shoppingLists, items } = require('../../data');

// Delete a specific item from a specific shopping list by IDs
router.delete('/shopping-lists/:listId/items/:itemId', (req, res) => {
  const { listId, itemId } = req.params;

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find((list) => list.id === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Check if the item ID exists in the shopping list
  const itemIndex = shoppingList.itemIDList.indexOf(itemId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found in the shopping list' });
  }

  // Remove the item ID from the shopping list's itemIDList
  shoppingList.itemIDList.splice(itemIndex, 1);

  res.json({ message: `Item with ID ${itemId} has been deleted from the shopping list with ID ${listId}.` });
});

module.exports = router;