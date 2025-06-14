/* eslint-disable react/react-in-jsx-scope */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { abbreviateString } from "@/utils/abbreviateString"
import { useMediaQuery } from "react-responsive"
import style from "./Graph.module.css"
import { useAppSelector } from "@/store/lib/hooks"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

type Props = {
  bookTitles: string[]
  totalBookScores?: number[] | string[]
  bookScores?: (string | number)[]
  username?: string
  isSuggested?: boolean
}

const Graph: React.FC<Props> = ({
  bookTitles,
  totalBookScores,
  bookScores,
  username,
  isSuggested,
}: Props) => {
  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" })
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const labelsLen = handleDesktop
    ? bookTitles
    : bookTitles?.map((title) =>
        title.length > 15 ? abbreviateString(title) : title
      )

  const datasets: (string | number)[] = bookScores ?? null
  const datasets2: number[] | string[] = totalBookScores

  const data = {
    labels: labelsLen,
    datasets: [
      {
        label: !isSuggested
          ? `${username}'s Scores`
          : `${username}'s Suggested Books`,
        axis: "y",
        data: datasets,
        backgroundColor: ["#095d09"],
        barPercentage: 1,
        display: datasets ? true : false,
      },
      {
        label: "Total Score",
        axis: "y",
        data: datasets2,
        backgroundColor: ["black"],
        barPercentage: 1,
      },
    ],
  }

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        display: datasets2 ? true : false,
        labels: {
          color: isDarkMode ? "white" : "black",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
      },
    },
    font: {
      size: 20,
    },
    scales: {
      y: {
        ticks: {
          color: isDarkMode ? "white" : "black",
          font: {
            size: 16,
            family: "Gentium Book Plus",
          },
        },
        title: {
          display: false,
        },
        display: true,
      },
      x: {
        ticks: {
          color: isDarkMode ? "white" : "black",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        title: {
          display: true,
          color: isDarkMode ? "white" : "black",
          text: isSuggested ? "Number of suggested books" : "Scores",
          font: {
            size: 20,
            family: "Gentium Book Plus",
          },
        },
        display: true,
        beginAtZero: true,
        max: isSuggested ? datasets?.length + 2 : 10,
      },
    },
  }

  return (
    <div className={style.graph}>
      <Bar data={data} options={options} />
    </div>
  )
}

export default Graph
