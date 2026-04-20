"use client"

import { Form, InputNumber } from "antd"
import { Book } from "@/types/BookInterface"
import { useEffect, useMemo, useState } from "react"
import { handleMultipleSubmits } from "@/utils/handleMultipleSubmits"
import { useAppSelector } from "@/store/lib/hooks"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../InputConfigWrapper"

type Props = {
  id: string | string[]
  singleBook: Book
  shortStoryData: any[]
}

const EditAnthologyRatingForm: React.FC<Props> = ({
  id,
  singleBook,
  shortStoryData,
}) => {
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
          {
            rating: raterStoriesArray.map((story) => story.score)[i],
          },
          "PUT",
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
    const newArr = shortStoryData.map((story) => ({ ...story }))
    setRaterStoriesArray(newArr)
  }
  useEffect(() => {
    const newArr = shortStoryData.map((story) => ({ ...story }))
    setRaterStoriesArray(newArr)
  }, [])
  return (
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
        <InputConfigWrapper key={story._id}>
          <Form.Item label={story.title}>
            <InputNumber
              className=""
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
        <UiButton
          textContent="Submit"
          loading={loadings}
          clickHandler={() => enterLoading()}
          htmlType="submit"
          ghost
        />
        {/* {error ? <h4 className="errorH">{error}</h4> : null} */}
      </Form.Item>
    </Form>
  )
}

export default EditAnthologyRatingForm
