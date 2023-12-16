import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../LanguageContext';

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

const ProductsChart = ({ chartData }) => {
  const { language } = useLanguage();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="shoppingListName" />
        <YAxis />
        {/* Use the CustomTooltip component instead of the default Tooltip */}
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey={language === 'cs' ? 'Počet produktů v seznamu' : 'Number of products in list'}
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductsChart;