import React, { createContext, useContext, useState } from 'react';

const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingListData, setShoppingListData] = useState(null);

  const updateShoppingListData = (newData) => {
    setShoppingListData(newData);
  };

  return (
    <ShoppingListContext.Provider value={{ shoppingListData, updateShoppingListData }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) {
    throw new Error('useShoppingList must be used within a ShoppingListProvider');
  }
  return context;
};