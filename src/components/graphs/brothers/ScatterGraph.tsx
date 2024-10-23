import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import styles from "./Graph.module.css";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = {
  labelArray: string[];
  pagesArray: number[];
  scoreArray: string[];
  xAxes: string;
  xMax: number;
  xMin: number;
};

const ScatterGraph: React.FC<Props> = ({ labelArray, pagesArray, scoreArray, xAxes, xMax, xMin }) => {

  const data = {
    labels: scoreArray,
    datasets: [
      {
        label: "Total Scores",
        axis: "x",
        data: pagesArray,
        backgroundColor: ["#095d09"],
        pointRadius: 8,
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const pages = pagesArray[context.dataIndex];
            const scores = scoreArray[context.dataIndex];
            const bookTitle = labelArray[context.dataIndex];
            return `${bookTitle}: ${pages}, ${scores}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        title: {
          display: true,
          text: "Total Scores",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        display: true,
        beginAtZero: true,
        max: 10
      },
      x: {
        ticks: {
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        title: {
          display: true,
          text: xAxes,
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        display: true,
        max: xMax,
        min: xMin
      },
    },
  };
  return (
    <div className={styles.graph}>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default ScatterGraph;
