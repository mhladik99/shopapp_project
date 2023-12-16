import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && label) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

const ProductsChart = () => {
  const [data, setData] = useState([]);
  const [shoppingListNames, setShoppingListNames] = useState({});

  useEffect(() => {
    // Fetch shopping list names
    axios.get('http://localhost:3001/shoppingLists/')
      .then(response => {
        const shoppingListNamesMap = response.data.reduce((acc, list) => {
          acc[list.id] = list.name;
          return acc;
        }, {});
        setShoppingListNames(shoppingListNamesMap);
      })
      .catch(error => {
        console.error('Error fetching shopping list names:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch data from the provided URL
    axios.get('http://localhost:3001/products')
      .then(response => {
        // Structure the data to count the number of products in each shopping list
        const countedData = response.data.reduce((acc, product) => {
          const shoppingListId = product.shoppingListId;
          acc[shoppingListId] = (acc[shoppingListId] || 0) + 1;
          return acc;
        }, {});

        // Convert the counted data into an array of objects with shopping list names
        const chartData = Object.keys(countedData).map(shoppingListId => ({
          shoppingListName: shoppingListNames[shoppingListId],
          'Počet produktů v seznamu': countedData[shoppingListId],
        }));

        setData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [shoppingListNames]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="shoppingListName" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Počet produktů v seznamu" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductsChart;