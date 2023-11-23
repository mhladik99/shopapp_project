const express = require('express');
const router = express.Router();
const { shoppingLists } = require('../../data');

// Get all shopping lists without item details
router.get('/shopping-lists', (req, res) => {
  const simplifiedShoppingLists = shoppingLists.map((shoppingList) => ({
    id: shoppingList.id,
    sys: shoppingList.sys,
    name: shoppingList.name,
    ownerID: shoppingList.ownerID,
    memberIDList: shoppingList.memberIDList,
    archived: shoppingList.archived,

  }));

  res.json(simplifiedShoppingLists);
});

module.exports = router;