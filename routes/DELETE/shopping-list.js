const express = require('express');
const router = express.Router();
const { shoppingLists, items } = require('../../data');

// Delete a specific shopping list by ID
router.delete('/shopping-lists/:id', (req, res) => {
  const { id } = req.params;
  const index = shoppingLists.findIndex((list) => list.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Remove the shopping list from the array
  const deletedList = shoppingLists.splice(index, 1)[0];

  res.json({ message: `Shopping list with id: ${id} has been deleted successfully.` });
});

module.exports = router;