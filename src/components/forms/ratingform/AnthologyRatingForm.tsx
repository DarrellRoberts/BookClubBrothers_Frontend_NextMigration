"use client"

import { Button, Form, InputNumber } from "antd"
import { Book } from "@/types/BookInterface"
import { useMemo, useState } from "react"
import { handleMultipleSubmits } from "@/utils/handleMultipleSubmits"
import { useAppSelector } from "@/store/lib/hooks"
import { config } from "@/configs/config"
import { InputConfigWrapper } from "../InputConfigWrapper"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  id: string | string[]
  singleBook: Book
}

const AnthologyRatingForm: React.FC<Props> = ({ id, singleBook }) => {
  const [raterStoriesArray, setRaterStoriesArray] = useState([])
  const [loadings, setLoadings] = useState<boolean>(false)
  const token = useAppSelector((state) => state.token.tokenState)

  const enterLoading = () => {
    setLoadings(true)
    setTimeout(() => {
      setLoadings(false)
      document.location.reload()
    }, 1250)
  }

  const handleSubmit2 = async () => {
    const promiseArr = []
    if (!singleBook.shortStories) return null
    for (let i = 0; i < singleBook.shortStories.length; i++) {
      promiseArr.push(
        await handleMultipleSubmits(
          `${config.API_URL}/books/${id}/${singleBook?.shortStories[i]._id}`,
          { rating: raterStoriesArray.map((story) => story.score)[i] },
          "POST",
          token,
        ),
      )
    }
    if (promiseArr.length > 0) {
      Promise.all(promiseArr)
    } else {
      return null
    }
  }

  const handleTotalRatingArr = (value: number, title: string) => {
    const findObject = raterStoriesArray.find((story) => story.title === title)
    findObject.score = value
    const newArray = raterStoriesArray.map((story) =>
      story.title !== title ? story : findObject,
    )
    setRaterStoriesArray(newArray)
  }

  const handleTotalRating = useMemo(() => {
    if (raterStoriesArray.length === 0) return null
    const total: number = raterStoriesArray
      .map((story) => story.score)
      .reduce((prev, curr) => prev + curr, 0)
    if (total === 0) return null
    return total / raterStoriesArray.length
  }, [raterStoriesArray])

  const handleRatingsReset = () => {
    if (!singleBook?.shortStories) return null
    setRaterStoriesArray([])
  }
  return (
    <>
      <Form
        onFinish={handleSubmit2}
        name="basic"
        labelCol={{
          span: 20,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <UiButton
          type="primary"
          ghost
          clickHandler={() => handleRatingsReset()}
          textContent={"Reset"}
        />
        {singleBook.shortStories?.map((story, idx) => (
          <InputConfigWrapper>
            <Form.Item key={story._id} label={story.title}>
              <InputNumber
                className="ml-2"
                min={0}
                max={10}
                onChange={(e) => {
                  handleTotalRatingArr(Number(e), story.title)
                }}
                value={raterStoriesArray[idx]?.score}
              />
            </Form.Item>
          </InputConfigWrapper>
        ))}
        <h3 className="text-white font-bold text-xl text-center mb-5">
          Your rating: {handleTotalRating?.toFixed(2)}
        </h3>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            ghost
            className="loginButtons"
            loading={loadings}
            onClick={() => enterLoading()}
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
          {/* {error ? <h4 className="errorH">{error}</h4> : null} */}
        </Form.Item>
      </Form>
    </>
  )
}

export default AnthologyRatingForm
