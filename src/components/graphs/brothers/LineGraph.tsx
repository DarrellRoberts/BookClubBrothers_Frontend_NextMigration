import React from "react";
import Cookies from "js-cookie";
import styles from "./Graph.module.css";
import { Line } from "react-chartjs-2";

type Props = {
  labelArray: string[];
  dateArray: string[];
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

  const jsonArr = [];

  const createJsonArr = () => {
    for (let i = 0; i < dateArray.length; i++) {
      const obj = { x: dateArray[i], y: scoreArray[i] };
      jsonArr.push(obj);
    }
    return jsonArr;
  };

  createJsonArr();

  const dateLabels = [...new Set(dateArray)];

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: "Total Scores",
        data: jsonArr,
        backgroundColor: darkCookie ? ["#FFFFFF"] : ["#000000"],
        borderColor: ["#095d09"],
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
