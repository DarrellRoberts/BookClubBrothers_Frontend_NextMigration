/* eslint-disable react/react-in-jsx-scope */
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import { abbreviateString } from "@/functions/abbreviateString";
import style from "./Graph.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

type Props = {
  bookTitles: string[],
  totalBookScores?: number[],
  bookScores?: number[],
  username?: string
}

const Graph: React.FC<Props> = ({bookTitles, totalBookScores, bookScores, username}: Props) => {

  const labelsLen = bookTitles.map(title =>
    title.length > 22 ? abbreviateString(title) : title);

  const datasets: number[] = bookScores ?? null;
  const datasets2: number[] = totalBookScores;

  const data = {
    labels: labelsLen,
    datasets: [
      {
        label: `${username}'s Scores`,
        axis: 'y',
        data: datasets,
        backgroundColor: ["#095d09"],
        barPercentage: 1,
        display: datasets ? true : false
      },
      {
        label: "Total Score",
        axis: 'y',
        data: datasets2,
        backgroundColor: ["black"],
        barPercentage: 1
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: datasets2 ? true : false,
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
            size: datasets2 ? 16 : 20,
            family: 'Gentium Book Plus'
          }
        },
        title: {
          display: false,
        },
        display: true,
      },
      x: {
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
    },
  };

  return (
    <div className={style.graph}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
