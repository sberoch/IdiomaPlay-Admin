import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export function LineChart(props: any) {
    var data = {
      labels: props.dates,
      datasets: [
        {
          label: 'Accesos diarios',
          data: props.values,
          borderColor: '#3da6c7',
          backgroundColor: '#3da6c7',
        },
      ],
    };
  return <Line options={options} data={data} />;
}