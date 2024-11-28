/* eslint-disable react/react-in-jsx-scope */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./Graph.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  booksRead: number[];
  unreadBooks: string[];
  userReadBooks: string[];
  bookTotal: number;
};

const PieChart: React.FC<Props> = ({
  booksRead,
  unreadBooks,
  userReadBooks,
  bookTotal,
}: Props) => {
  const booksReadPercentage: string = (
    (userReadBooks?.length / bookTotal) *
    100
  ).toFixed(2);
  const dataset1: number[] = booksRead ?? [];
  const labels1 = [
    ["Read Books", ...userReadBooks],
    ["Unread Books", ...unreadBooks],
  ];

  const data = {
    labels: labels1,
    datasets: [
      {
        data: dataset1,
        backgroundColor: ["#095d09", "#000000"],
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        display: false,
      },
      labels: {
        position: "absolute",
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 16,
        },
      },
    },
  };

  return (
    <div className={style.pieCon}>
      <Doughnut data={data} options={options} />
      <h3 className={style.percentage}>{booksReadPercentage} %</h3>
    </div>
  );
};

export default PieChart;
