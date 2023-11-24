const express = require('express');
const router = express.Router();
const { checkOwnership } = require('../../authMiddleware');
const { shoppingLists } = require('../../data');

// Use the checkOwnership middleware
router.delete('/shopping-lists/:id', checkOwnership, (req, res) => {
  const { id } = req.params;

  // At this point, you can access the shopping list data from req.shoppingList
  const index = shoppingLists.findIndex((list) => list.id === id);
  if (index !== -1) {
    const deletedList = shoppingLists.splice(index, 1)[0];
    res.json({ message: `Shopping list with id: ${id} has been deleted successfully.` });
  } else {
    res.status(404).json({ error: 'Shopping list not found' });
  }
});

module.exports = router;