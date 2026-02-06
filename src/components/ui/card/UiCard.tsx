import { Card, ConfigProvider } from "antd"
import Image from "next/image"
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
        style={{ width: 250, border: "2px solid black" }}
        cover={
          <Image
            draggable={false}
            alt={`${bookTitle} book cover`}
            src={`${bookCoverImage}`}
            className="p-2 rounded-lg bg-white h-75 hover:shadow-bc-green hover:shadow-2xl"
            width={500}
            height={500}
          />
        }
      >
        <div className="flex w-full items-center justify-around h-full">
          <div className="w-25">
            <Image
              key={bookTitle}
              alt="Worm badge certification"
              src={
                calcTotalPercentage >= 50
                  ? "/book-library/book-card-cert-fresh.webp"
                  : "/book-library/book-card-cert-rotten.webp"
              }
              width={100}
              height={100}
              className="w-full"
            />
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-2xl font-(family-name:--main) font-bold"
              style={{
                color: calcTotalPercentage < 50 ? "#F77A7D" : "#FFDC73",
              }}
            >{`${hideScores ? "?" : calcTotalPercentage + "%"}`}</span>
            <span
              className="text-xl font-(family-name:--main) font-bold"
              style={{
                color: calcTotalPercentage < 50 ? "#F77A7D" : "#FFDC73",
              }}
            >{`${calcTotalPercentage >= 50 ? "Fresh" : "Rotten"}`}</span>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default UiCard
