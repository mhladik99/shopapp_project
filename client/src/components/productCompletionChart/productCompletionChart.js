import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useLanguage } from '../../LanguageContext';

const ProductCompletionChart = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { language } = useLanguage();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/shoppingLists/${id}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!products.length) {
    // Loading state or error handling can be added here
    return null;
  }

  const completedCount = products.filter(product => product.completed).length;
  const notCompletedCount = products.length - completedCount;

  const pieChartData = [
    { name: (language === 'cs' ? "Počet vyřešených" : "Number of solved"), value: completedCount },
    { name: (language === 'cs' ? "Počet nevyřešených" : "Number of unsolved"), value: notCompletedCount },
  ];

  const COLORS = ['#007BFF', '#FF8042'];

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie dataKey="value" data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductCompletionChart;