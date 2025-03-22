import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const feedbackQuestions = [
  'CNC Milling Machine Operation',
  'CNC Milling Efficiency',
  'AMR Operation',
  'AMR Efficiency',
  '3D Metal Printer Setup'
];

const feedbackData = [
  [4, 3, 5, 2, 4],
  [3, 2, 2, 3, 3],
  [5, 5, 5, 5, 5],
  [1, 2, 2, 3, 1],
  [4, 3, 4, 5, 5],
  [3, 4, 5, 1, 5]
];

export function FeedbackVisualization() {
  const averageRatings = feedbackData[0].map((_, colIndex) => {
    const sum = feedbackData.reduce((acc, row) => acc + row[colIndex], 0);
    return sum / feedbackData.length;
  });

  const chartData = {
    labels: feedbackQuestions,
    datasets: [{
      label: 'Average Rating',
      data: averageRatings,
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { 
        display: true, 
        text: 'Manufacturing Equipment User Feedback' 
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <Bar options={chartOptions} data={chartData} height={300} />
      <div className="mt-4 grid grid-cols-1 gap-4">
        {feedbackQuestions.map((question, index) => (
          <div key={index} className="border-b pb-2">
            <h3 className="font-medium">{question}</h3>
            <p className="text-sm text-gray-600">
              Average rating: {averageRatings[index].toFixed(1)} / 5.0
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}