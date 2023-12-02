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

  const addProduct = (productName) => {
    const newProduct = {
      id: products.length + 1,
      name: productName,
      completed: false,
    };
    setProducts([...products, newProduct]);
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
