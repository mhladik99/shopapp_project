const express = require('express');
const router = express.Router();
const { shoppingLists, items, users } = require('../../data');

// Get a specific shopping list by ID
router.get('/shopping-lists/:id', (req, res) => {
  const { id } = req.params;
  const shoppingList = shoppingLists.find(list => list.id === id);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  const { id: ownerId, ...ownerDetails } = users.find(user => user.id === shoppingList.ownerID);

  const membersDetails = shoppingList.memberIDList.map(memberId => {
    const { id: memberIdToRemove, ...memberDetails } = users.find(user => user.id === memberId);
    return memberDetails;
  });

  const itemsDetails = shoppingList.itemIDList.map(itemId => items.find(item => item.id === itemId));

  const shoppingListWithItemsAndMembers = {
    ...shoppingList,
    owner: ownerDetails,
    members: membersDetails,
    items: itemsDetails,
  };

  res.json(shoppingListWithItemsAndMembers);
});

module.exports = router;