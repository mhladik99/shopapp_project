import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../LanguageContext';
import { useShoppingList } from '../../ShoppingListContext';
import './productCompletionChart.css'

const ProductCompletionChart = () => {
  const { shoppingListData } = useShoppingList();
  const { language } = useLanguage();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsData = shoppingListData ? shoppingListData.products : [];
    setProducts(productsData);
  }, [shoppingListData]);

  if (!products.length) {
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