import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './shoppingList.css';
import { useLanguage } from '../../LanguageContext';

import AddItemForm from '../addItemForm/addItemForm';
import Button from '../Button/Button';
import { useShoppingList } from '../../ShoppingListContext';

const ShowCompletedProductsButton = ({ showCompleted, onShowCompleted }) => {
  const { language } = useLanguage();
  const handleShowCompleted = () => {
    onShowCompleted(!showCompleted);
  };

  return (
    <Button onClick={handleShowCompleted} className="toggle-button">
  {showCompleted
    ? (
      language === 'cs' ? <p>Skrýt vyřešené</p> : <p>Hide Resolved</p>
    )
    : (
      language === 'cs' ? <p>Zobrazit vyřešené</p> : <p>Show Resolved</p>
    )
  }
</Button>
  );
};

const ShoppingListItem = ({ product, onToggleComplete, onDeleteProduct, showCompleted }) => {
  const { language } = useLanguage();
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
      <Button onClick={() => onDeleteProduct(product.id)} className="remove-button">{language === 'cs' ? <p>- Odebrat</p> : <p>- Remove</p>}</Button>
    </li>
  );
};

const ShoppingList = () => {
  const { shoppingListData, updateShoppingListData } = useShoppingList();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/shoppingLists/${id}/products`);
      const productsData = response.data || [];

      // Update the state with the products
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleToggleComplete = async (productId) => {
    try {
      const productToUpdate = products.find((product) => product.id === productId);

      const response = await axios.patch(
        `http://localhost:3001/shoppingLists/${id}/products/${productId}`,
        { completed: !productToUpdate.completed }
      );

      if (response.status === 200) {
        const updatedProducts = products.map((product) =>
          product.id === productId ? { ...product, completed: !product.completed } : product
        );

        // Update the shared state in the context first
        updateShoppingListData({ id, products: updatedProducts });

        // Update the local state
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error updating completion status:', error);
      // Handle error, e.g., show an error message to the user
    }
  };


  const handleDeleteProduct = async (productId) => {
    try {
      // Make a DELETE request to remove the product from the shopping list
      await axios.delete(`http://localhost:3001/shoppingLists/${id}/products/${productId}`);
  
      // Update the state by removing the deleted product
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const addProduct = async (productName) => {
    try {
      const newProduct = {
        name: productName,
        completed: false,
      };
  
      // Make a POST request to add the new product to the shopping list
      const response = await axios.post(`http://localhost:3001/shoppingLists/${id}/products`, newProduct);
  
      // Check if the response contains the updated product directly
      const addedProduct = response.data || null;
  
      if (addedProduct) {
        // Update the state with the existing products and the newly added one
        setProducts((prevProducts) => [...prevProducts, addedProduct]);
      } else {
        console.error('Invalid response when adding product:', response);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error, e.g., show an error message to the user
    }
  };
  
  useEffect(() => {
    updateShoppingListData({ id, products });
  }, [id, products]);

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
