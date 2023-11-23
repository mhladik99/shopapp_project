const express = require('express');
const router = express.Router();
const { shoppingLists, items } = require('../../data');
const { generateId } = require('../../helpers');

// Add a new item to a shopping list by ID
router.post('/shopping-lists/:listId/items', (req, res) => {
  const { listId } = req.params;
  const { name } = req.body;

  // Validate that required fields are present
  if (!name) {
    return res.status(400).json({ error: 'Item name is required' });
  }

  // Validate item name length
  if (name.length < 1 || name.length > 255) {
    return res.status(400).json({ error: 'Item name must be between 1 and 255 characters' });
  }

  // Create a new item with default values
  const newItem = {
    id: generateId(),
    sys: {
      cts: new Date().toISOString(),
      mts: new Date().toISOString(),
    },
    name,
    itemChecked: false,
  };

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find((list) => list.id === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Add the new item's ID to the shopping list's itemIDList
  shoppingList.itemIDList.push(newItem.id);

  // Add the new item to the global items array
  items.push(newItem);

  res.status(201).json(newItem);
});

module.exports = router;