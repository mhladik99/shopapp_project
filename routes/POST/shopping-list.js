const express = require('express');
const router = express.Router();
const { shoppingLists, items, users } = require('../../data');
const { generateId } = require('../../helpers');

// Add a new shopping list
router.post('/shopping-lists', (req, res) => {
  const { name, ownerID, memberID } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Shopping list name is required' });
  }

  if (name.length < 1 || name.length > 255) {
    return res.status(400).json({ error: 'Shopping list name must be between 1 and 255 characters' });
  }

  // Check if the ownerID is a valid user ID
  if (!users.find(user => user.id === ownerID)) {
    return res.status(400).json({ error: 'Invalid ownerID' });
  }

  // Check if memberIDs are valid user IDs
  if (memberID) {
    const invalidMembers = memberID.filter(memberID => !users.find(user => user.id === memberID));
    if (invalidMembers.length > 0) {
      return res.status(400).json({ error: 'Invalid memberID', invalidMembers });
    }
  }

  // Create a new shopping list
  const newShoppingList = {
    id: generateId(),
    sys: {
      cts: new Date().toISOString(),
      mts: new Date().toISOString(),
    },
    ownerID,
    memberIDList: memberID || [],
    name,
    archived: false,
    itemIDList: [],
  };

  // Add the new shopping list to the global shoppingLists array
  shoppingLists.push(newShoppingList);

  res.status(201).json(newShoppingList);
});

module.exports = router;