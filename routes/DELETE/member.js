const express = require('express');
const router = express.Router();
const { shoppingLists, items, users } = require('../../data');

// Delete a member from an existing shopping list
router.delete('/shopping-lists/:id/remove-member', (req, res) => {
  const { id } = req.params;
  const { memberID } = req.body;

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find(list => list.id === id);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Check if the memberID is a valid user ID
  const existingMember = users.find(user => user.id === memberID);
  if (!existingMember) {
    return res.status(400).json({ error: 'Invalid memberID' });
  }

  // Check if the member is in the shopping list
  const memberIndex = shoppingList.memberIDList.indexOf(memberID);
  if (memberIndex === -1) {
    return res.status(400).json({ error: 'Member is not in the shopping list' });
  }

  // Remove the member from the shopping list
  shoppingList.memberIDList.splice(memberIndex, 1);

  res.json({ message: `Member was deleted from the shopping list.` });
});

module.exports = router;