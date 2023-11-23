const express = require('express');
const router = express.Router();
const { items } = require('../../data');

// Get information about a specific item by ID
router.get('/shopping-lists/:listId/items/:itemId', (req, res) => {
  const { itemId } = req.params;

  // Find the item by ID
  const item = items.find((item) => item.id === itemId);

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(item);
});

module.exports = router;