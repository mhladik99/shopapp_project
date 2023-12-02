import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './shoppingList.css';

import AddItemForm from '../addItemForm/addItemForm';
import Button from '../Button/Button';

const ShowCompletedProductsButton = ({ showCompleted, onShowCompleted }) => {
  const handleShowCompleted = () => {
    onShowCompleted(!showCompleted);
  };

  return (
    <Button onClick={handleShowCompleted} className="toggle-button">
      {showCompleted ? 'Skrýt vyřešené' : 'Zobrazit vyřešené'}
    </Button>
  );
};

const ShoppingListItem = ({ product, onToggleComplete, onDeleteProduct, showCompleted }) => {
  if (!showCompleted && product.completed) {
    return null; // Return null for completed products if showCompleted is false
  }

  const itemClassName = `product-names ${product.completed ? 'completed-text' : ''}`;

  return (
    <li key={product.id} className={`product-item ${product.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        id={`checkbox-${product.id}`}
        className="checkbox"
        checked={product.completed}
        onChange={() => onToggleComplete(product.id)}
      />
      <label htmlFor={`checkbox-${product.id}`} className="checkbox-label">
        <span className="checkbox-custom"></span>
      </label>
      <div className={itemClassName}>
        <span>{product.name}</span>
      </div>
      <button onClick={() => onDeleteProduct(product.id)}>- Odebrat</button>
    </li>
  );
};

const ShoppingList = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/shoppingLists/${id}`);
        const shoppingListData = response.data;
        setProducts(shoppingListData.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleToggleComplete = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, completed: !product.completed } : product
    );
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const addProduct = async (productName) => {
    try {
      const newProduct = {
        id: 10,
        name: productName,
        completed: false,
      };
  
      // Make a POST request to add the new product to the shopping list
      const response = await axios.post(`http://localhost:3001/shoppingLists/${id}/products`, newProduct);
  
      // Find the correct shopping list in the response and update the state
      const updatedShoppingList = response.data.shoppingLists.find(list => list.id === parseInt(id, 10));
      setProducts(updatedShoppingList.products || []);
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  

  return (
    <div className="container">
      <AddItemForm addProduct={addProduct} />
      <ul>
        {products.map((product) => (
          <ShoppingListItem
            key={product.id}
            product={product}
            onToggleComplete={handleToggleComplete}
            onDeleteProduct={handleDeleteProduct}
            showCompleted={showCompleted}
          />
        ))}
      </ul>
      <ShowCompletedProductsButton showCompleted={showCompleted} onShowCompleted={setShowCompleted} />
    </div>
  );
};

export default ShoppingList;
