const { shoppingLists } = require('./data');

function checkOwnership(req, res, next) {
  const { id } = req.params;
  const index = shoppingLists.findIndex((list) => list.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  const userId = req.header('user-id');

  if (shoppingLists[index].ownerID !== userId) {
    return res.status(403).json({ error: 'Forbidden: You are not the owner of this shopping list' });
  }

  // Attach the shopping list data to the request for later use if needed
  req.shoppingList = shoppingLists[index];

  // Call next to proceed to the actual route handler
  next();
}

module.exports = {
  checkOwnership,
};