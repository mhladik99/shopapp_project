const express = require('express');
const router = express.Router();
const { shoppingLists, items } = require('../../data');

// Get all items in a specific shopping list by ID
router.get('/shopping-lists/:id/items', (req, res) => {
  const { id } = req.params;
  
  // Find the shopping list by ID
  const shoppingList = shoppingLists.find((list) => list.id === id);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Get details about each item in the shopping list
  const itemsDetails = shoppingList.itemIDList.map((itemId) => {
    return items.find((item) => item.id === itemId);
  });

  res.json({ shoppingListId: id, items: itemsDetails });
});

module.exports = router;