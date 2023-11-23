const shoppingLists = [
  {
    id: "61e1556d17f0e248baf15f4b",
    sys: {
      cts: "2022-01-14T10:50:21.637Z",
      mts: "2022-01-14T10:50:42.542Z",
    },
    ownerID: "28-4322-1",
    memberIDList: ["37-4322-7", "29-4322-6"],
    name: "Kaufland",
    archived: false,
    itemIDList: ["17-4322-1"],
  },

];

const items = [
  {
    id: "17-4322-1",
    sys: {
      cts: "2022-01-14T10:50:21.637Z",
      mts: "2022-01-14T10:50:42.542Z",
    },
    name: "Banány",
    itemChecked: false,
  },

];

const users = [
  {
    id: "28-4322-1",
    name: "Paul Newman",
    email: "paul.newman@gmail.com"
  },
  {
    id: "37-4322-7",
    name: "Theresa Noring",
    email: "theresa.noring@gmail.com"
  },
  {
    id: "29-4322-6",
    name: "Robert Landsmann",
    email: "robert.landsmann@gmail.com"
  },
];

module.exports = {
  shoppingLists,
  items,
  users,
};