/* eslint-disable react/react-in-jsx-scope */
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, } from "chart.js";
import { Bar } from "react-chartjs-2";
import style from "./Graph.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

type Props = {
  bookTitles: string[],
  totalBookScores: number[],
  bookScores?: number[],
  username?: string
}

const Graph: React.FC<Props> = ({bookTitles, totalBookScores, bookScores, username}: Props) => {

  const labels: string[] = bookTitles;
  const datasets: number[] = bookScores ?? null;
  const datasets2: number[] = totalBookScores;

  const data = {
    labels: labels,
    datasets: [
      {
        label: `${username}'s Scores`,
        data: datasets,
        backgroundColor: ["#095d09"],
        barPercentage: 1,
        display: datasets ? true : false
      },
      {
        label: "Total Score",
        data: datasets2,
        backgroundColor: ["black"],
        barPercentage: 1
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20,
            family: 'Gentium Book Plus'
          }
        }
      }
    },
    font: {
      size: 20
    },
    scales: {
      y: {
        ticks: {
          font: {
            size: 20,
            family: 'Gentium Book Plus'
          }
        },
        title: {
          display: true,
          text: "Scores",
          font: {
            size: 20,
            family: 'Gentium Book Plus'
          }
        },
        display: true,
        beginAtZero: true,
        max: 10,
      },
      x: {
        ticks: {
          font: {
            size: 16,
            family: 'Gentium Book Plus'
          }
        },
        title: {
          display: false,
        },
        display: true,
      },
    },
  };

  return (
    <div className={style.graph}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
