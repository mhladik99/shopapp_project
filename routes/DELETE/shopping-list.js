const express = require('express');
const router = express.Router();
const { checkOwnership } = require('../../authMiddleware');
const { shoppingLists } = require('../../data');

// Use the checkOwnership middleware
router.delete('/shopping-lists/:listId', checkOwnership, (req, res) => {
  const { listId } = req.params;

  // At this point, you can access the shopping list data from req.shoppingList
  const index = shoppingLists.findIndex((list) => list.id === listId);
  if (index !== -1) {
    const deletedList = shoppingLists.splice(index, 1)[0];
    res.json({ message: `Shopping list with id: ${listId} has been deleted successfully.` });
  } else {
    res.status(404).json({ error: 'Shopping list not found' });
  }
});

module.exports = router;