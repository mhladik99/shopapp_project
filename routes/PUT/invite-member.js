const express = require('express');
const router = express.Router();
const { checkOwnership } = require('../../authMiddleware');
const { shoppingLists, users } = require('../../data');

// Add a member to an existing shopping list
router.put('/shopping-lists/:listId/add-member', checkOwnership, (req, res) => {
  const { listId } = req.params;
  const { memberID } = req.body;

  // Find the shopping list by ID
  const shoppingList = shoppingLists.find(list => list.id === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  // Check if the memberID is a valid user ID
  const newMember = users.find(user => user.id === memberID);
  if (!newMember) {
    return res.status(400).json({ error: 'Invalid memberID' });
  }

  // Check if the new member is the owner
  if (newMember.id === shoppingList.ownerID) {
    return res.status(400).json({ error: 'Cannot add the owner as a member' });
  }

  // Check if the new member is already in the shopping list
  if (shoppingList.memberIDList.includes(memberID)) {
    return res.status(400).json({ error: 'Member is already in the shopping list' });
  }

  // Add the new member to the shopping list
  shoppingList.memberIDList = [...new Set([...shoppingList.memberIDList, memberID])];

  res.json({ message: `Member was invited to the shopping list.` });
});

module.exports = router;