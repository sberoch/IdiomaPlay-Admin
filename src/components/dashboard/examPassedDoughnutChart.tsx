import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      display: true,
    },
    title: {
      display: false,
      text: "Unidades completadas por día",
    },
  },
};

export function ExamPassedDoughnutChart(props: any) {
  var data = {
    labels: props.categories,
    datasets: [
      {
        label: "# of Votes",
        data: props.values,
        backgroundColor: ["green", "red"],
        borderColor: ["green", "red"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={options} />;
}
