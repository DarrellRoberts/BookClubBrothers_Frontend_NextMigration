/* eslint-disable react/react-in-jsx-scope */
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import style from "./Graph.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  booksRead: number[],
  unreadBooks: string[],
  userReadBooks: string[]
}

const PieChart: React.FC<Props> = ({booksRead, unreadBooks, userReadBooks}: Props) => {

  const dataset1: number[] = booksRead ?? [];
  const labels1 = [["Read Books", ...userReadBooks], ["Unread Books", ...unreadBooks]];
  const booksReadPercentage: string = booksRead ? ((booksRead[0]/(booksRead[0] + booksRead[1])) * 100).toFixed(2) : "Loading";

  const data = {
    labels: labels1,
    datasets: [
      {
        data: dataset1,
        backgroundColor: ["#095d09", "#000000"],
        hoverOffset: 5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        display: false
      },
      labels: {
        position: "absolute"
      },
      datalabels: {
        color: "white",
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
  };

  const myPlugin = {
    id: 'myPlugin',
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor = chart.chartArea.left + (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor = chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2;
      ctx.save();
      ctx.font = "32px Gentium Book Plus";
      ctx.fillStyle = '#000000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${booksReadPercentage} %`, xCoor, yCoor);
      ctx.restore();
    }
  };

  return (
    <div className={style.pieCon}>
      <Doughnut data={data} options={options} plugins={[myPlugin]} />
    </div>
  );
};

export default PieChart;
