import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
      display: true,
    },
    title: {
      display: false,
      text: "Unidades completadas por día",
    },
  },
};

export function AccessFrecuencyDoughnutChart(props: any) {
  var data = {
    labels: props.categories,
    datasets: [
      {
        label: "# of Votes",
        data: props.values,
        backgroundColor: [
          // 'rgba(54, 162, 235, 0.2)',
          // 'rgba(255, 206, 86, 0.2)',
          // 'rgba(255, 99, 132, 0.2)',
          // 'rgba(75, 192, 192, 0.2)',
          "#3da6c7",
          "yellow",
          "green",
          "blue",
        ],
        borderColor: [
          // 'rgba(54, 162, 235, 1)',
          // 'rgba(255, 206, 86, 1)',
          // 'rgba(255, 99, 132, 1)',
          // 'rgba(75, 192, 192, 1)',
          "#3da6c7",
          "yellow",
          "green",
          "blue",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
