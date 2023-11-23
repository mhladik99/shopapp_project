const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./database/connect");

app.use(express.json());

// GET
const getShoppingList = require('./routes/GET/shopping-lists');
const getShoppingLists = require('./routes/GET/shopping-list');
const getItems = require('./routes/GET/items');
const getItem = require('./routes/GET/item');

// POST
const postShoppingList = require('./routes/POST/shopping-list');
const postItem = require('./routes/POST/item');

// DELETE
const deleteShoppingList = require('./routes/DELETE/shopping-list');
const deleteItem = require('./routes/DELETE/item');
const deleteMember = require('./routes/DELETE/member');

// PUT
const putItemChecked = require('./routes/PUT/change-item-checked.js');
const putListArchived = require('./routes/PUT/change-list-archived.js');
const putInviteMember = require('./routes/PUT/invite-member.js');

app.use('/', deleteShoppingList);
app.use('/', deleteMember);
app.use('/', putInviteMember);

app.use('/', getShoppingList);
app.use('/', getShoppingLists);
app.use('/', getItems);
app.use('/', getItem);
app.use('/', postShoppingList);
app.use('/', postItem);
app.use('/', deleteItem);
app.use('/', putItemChecked);
app.use('/', putListArchived);

db.connect();
app.get("/", (request, response) => {
    response.send("Homepage");
});

app.listen(PORT, (err) => { 
    console.log("Server běží.")
});