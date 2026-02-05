import { Card, ConfigProvider } from "antd"
import React from "react"

type Props = {
  bookTitle: string
  bookCoverImage: string
  calcTotalPercentage: number
  hideScores: boolean
}

const UiCard = ({
  bookTitle,
  bookCoverImage,
  calcTotalPercentage,
  hideScores,
}: Props) => {
  const cardTheme = {
    components: {
      Card: {
        colorBgContainer: "#095d09",
        colorText: "#EEEEE6",
      },
    },
  }
  return (
    <ConfigProvider theme={cardTheme}>
      <Card
        style={{ width: 275, border: "2px solid black" }}
        cover={
          <img
            draggable={false}
            alt={`${bookTitle} book cover`}
            src={`${bookCoverImage}`}
            className="p-5 rounded-lg bg-white h-85 hover:shadow-bc-green hover:shadow-2xl"
          />
        }
      >
        <div className="flex w-full items-center justify-around h-full">
          <div className="w-25">
            <img
              key={bookTitle}
              alt="Worm badge certification"
              src={
                calcTotalPercentage >= 50
                  ? "/book-library/book-card-cert-fresh.webp"
                  : "/book-library/book-card-cert-rotten.webp"
              }
              width="700"
              className="w-full"
            />
          </div>
          <span className="text-2xl font-(family-name:--main) font-bold">{`${hideScores ? "?" : calcTotalPercentage + "%"}`}</span>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default UiCard
