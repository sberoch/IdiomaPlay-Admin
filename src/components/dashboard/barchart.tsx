import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

export const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
      //   position: 'bottom' as const,
          display:false,
      },
      title: {
        display: false,
        text: 'Unidades completadas por día',
      },
    },
  };


export function BarChart(props: any) {
    var data = {
        labels: props.dates,
        datasets: [
          {
            label: 'Unidades completadas',
            data: props.values,
            borderColor: '#3da6c7',
            backgroundColor: '#3da6c7',
          },
        ],
      };
  return <Bar options={options} data={data} />;
}
