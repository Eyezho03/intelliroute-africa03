import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const AdvancedAnalytics = () => {
  // Example chart data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Delivery Performance',
        data: [85, 90, 78, 88, 92, 95],
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.3
      }
    ]
  };

  // AI Suggestion Example
  const aiSuggestion = 'Consider rerouting through Route X for a 20% faster delivery time.';

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-4">Advanced Analytics & AI Suggestions</h2>
      <Line data={data} />
      <div className="mt-6">
        <h3 className="text-md font-bold">AI Suggestion:</h3>
        <p className="text-gray-700">{aiSuggestion}</p>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;

