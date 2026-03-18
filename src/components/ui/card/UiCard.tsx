import { F_WORM_IMAGE, R_WORM_IMAGE, UNKNOWN_IMAGE } from "@/configs/config"
import { Card, ConfigProvider } from "antd"
import Image from "next/image"
import React, { useMemo } from "react"

type Props = {
  bookTitle: string
  bookCoverImage: string
  totalScore: number
  hideScores: boolean
  isSingleBook?: boolean
}

const UiCard = ({
  bookTitle,
  bookCoverImage,
  totalScore,
  hideScores,
  isSingleBook,
}: Props) => {
  const imageObject = useMemo(() => {
    if (hideScores) {
      return { src: UNKNOWN_IMAGE, textColor: "#FFFFFF", text: "" }
    }
    if (totalScore >= 5) {
      return { src: F_WORM_IMAGE, textColor: "#FFDC73", text: "Fresh" }
    } else {
      return { src: R_WORM_IMAGE, textColor: "#F77A7D", text: "Rotten" }
    }
  }, [hideScores, totalScore])

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
        style={{
          border: "2px solid black",
        }}
        className={isSingleBook ? "w-100 max-sm:w-63" : "w-63"}
        cover={
          <Image
            draggable={false}
            alt={`${bookTitle} book cover`}
            src={`${bookCoverImage}`}
            className={
              isSingleBook
                ? "h-125 max-sm:h-70 p-2 rounded-lg bg-white"
                : "p-2 rounded-lg bg-white h-75 hover:shadow-bc-green hover:shadow-2xl"
            }
            width={500}
            height={500}
          />
        }
      >
        <div className="flex w-full items-center justify-around h-full">
          <div className="w-25 h-23">
            <Image
              key={bookTitle}
              alt="Worm badge certification"
              src={imageObject.src}
              width={100}
              height={100}
              className="w-full rounded-4xl"
            />
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-2xl font-(family-name:--main) font-bold"
              style={{
                color: imageObject.textColor,
                fontSize: isSingleBook ? "3rem" : "1.5rem",
              }}
            >{`${hideScores ? "?" : totalScore?.toFixed(1) + "/10"}`}</span>
            <span
              className="text-xl font-(family-name:--main) font-bold"
              style={{
                color: imageObject.textColor,
              }}
            >
              {imageObject.text}
            </span>
          </div>
        </div>
      </Card>
    </ConfigProvider>
  )
}

export default UiCard
