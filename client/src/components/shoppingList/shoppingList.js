import React, { useState } from 'react';
import AddItemForm from '../addItemForm/addItemForm';
import './shoppingList.css';
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
  const [products, setProducts] = useState([
    { id: 1, name: 'Banány', completed: false },
    { id: 2, name: 'Mouka', completed: false },
    { id: 3, name: 'Brambory', completed: false },
    { id: 4, name: 'Petržel', completed: false },
  ]);

  const [showCompleted, setShowCompleted] = useState(false);

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
