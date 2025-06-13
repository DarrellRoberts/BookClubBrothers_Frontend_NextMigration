/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { Button, Form, InputNumber } from "antd"
import { Book } from "@/types/BookInterface"
import { useEffect, useMemo, useState } from "react"
import { handleMultipleSubmits } from "@/utils/handleMultipleSubmits"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  id: string | string[]
  bookData: Book
  shortStoryData: object
}

const EditAnthologyRatingForm: React.FC<Props> = ({
  id,
  bookData,
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
    }, 4000)
  }

  const handleSubmit2 = async () => {
    const promiseArr = []
    if (!bookData.shortStories) return null
    for (let i = 0; i < bookData.shortStories.length; i++) {
      promiseArr.push(
        await handleMultipleSubmits(
          `https://bookclubbrothers-backend.onrender.com/books/${id}/${bookData?.shortStories[i]._id}`,
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
    // if (!bookData?.shortStories) return null
    if (Object.values(raterStoriesObject).length === 0) return null
    const total: number = Object.values(raterStoriesObject).reduce(
      (prev: number, curr: number) => prev + curr,
      0
    )
    if (total === 0) return null
    return total / Object.values(raterStoriesObject).length
  }, [raterStoriesObject])

  const handleRatingsReset = () => {
    if (!bookData?.shortStories) return null
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
        >
          Reset
        </Button>
        {bookData.shortStories?.map((story) => (
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
          >
            Submit
          </Button>
          {/* {error ? <h4 className="errorH">{error}</h4> : null} */}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditAnthologyRatingForm
