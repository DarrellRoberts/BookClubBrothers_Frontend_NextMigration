"use client"

import { Button, Form, InputNumber } from "antd"
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
  shortStoryData: object
}

const EditAnthologyRatingForm: React.FC<Props> = ({
  id,
  singleBook,
  shortStoryData,
}) => {
  const [raterStoriesObject, setRaterStoriesObject] = useState<object>({})
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
          { rating: Object.values(raterStoriesObject)[i] },
          "PUT",
          token
        )
      )
    }
    if (promiseArr.length > 0) {
      Promise.all(promiseArr)
    } else {
      return null
    }
  }

  const handleTotalRatingArr = (value: number, key: string) => {
    setRaterStoriesObject({ ...raterStoriesObject, [key]: value })
  }

  const handleTotalRating = useMemo(() => {
    if (Object.values(raterStoriesObject).length === 0) return null
    const total: number = Object.values(raterStoriesObject).reduce(
      (prev: number, curr: number) => prev + curr,
      0
    )
    if (total === 0) return null
    return total / Object.values(raterStoriesObject).length
  }, [raterStoriesObject])

  const handleRatingsReset = () => {
    if (!singleBook?.shortStories) return null
    setRaterStoriesObject({ ...shortStoryData })
  }
  useEffect(() => {
    setRaterStoriesObject({ ...shortStoryData })
  }, [])
  return (
    <>
      <Form
        onFinish={handleSubmit2}
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <Button
          type="primary"
          ghost
          className="loginButtons"
          onClick={() => handleRatingsReset()}
          size="large"
        >
          Reset
        </Button>
        {singleBook.shortStories?.map((story) => (
          <InputConfigWrapper>
            <Form.Item key={story._id} label={story.title}>
              <InputNumber
                className="ml-6"
                min={0}
                max={10}
                onChange={(e) => {
                  handleTotalRatingArr(Number(e), story.title)
                }}
                value={raterStoriesObject[story.title]}
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
    </>
  )
}

export default EditAnthologyRatingForm
