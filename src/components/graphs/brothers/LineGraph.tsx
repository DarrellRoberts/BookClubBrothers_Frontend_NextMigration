import React from "react";
import Cookies from "js-cookie";
import styles from "./Graph.module.css";
import { Line } from "react-chartjs-2";

type Props = {
  labelArray: string[];
  dateArray: number[];
  scoreArray: string[];
  xAxes: string;
};

const LineGraph: React.FC<Props> = ({
  labelArray,
  dateArray,
  scoreArray,
  xAxes,
}) => {
  const darkCookie = Cookies.get("dark-mode");

  const data = {
    labels: dateArray,
    datasets: [
      {
        label: "Total Scores",
        data: scoreArray,
        backgroundColor: ["#095d09"],
        borderColor: darkCookie ? ["#FFFFFF"] : ["#000000"],
        pointRadius: 8,
        tension: 0.35,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkCookie ? "white" : "black",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const date = dateArray[context.dataIndex];
            const scores = scoreArray[context.dataIndex];
            const bookTitle = labelArray[context.dataIndex];
            return `${bookTitle}: ${date}, ${scores}`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: darkCookie ? "white" : "black",
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
        max: 10,
      },
      x: {
        ticks: {
          color: darkCookie ? "white" : "black",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        title: {
          display: true,
          color: darkCookie ? "white" : "black",
          text: xAxes,
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        display: true,
      },
    },
  };
  return (
    <div className={styles.lineGraph}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
