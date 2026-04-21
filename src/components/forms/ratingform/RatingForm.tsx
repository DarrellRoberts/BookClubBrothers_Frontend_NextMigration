"use client"

import { Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { User } from "@/types/UserInterface"
import ScorePreview from "./ScorePreview"
import { useEffect } from "react"
import { API_CREATE_RATING } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../InputConfigWrapper"
import { CreateRatingPayload } from "@/types/Api"
import { Book } from "@/types/BookInterface"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"

type Props = {
  id: string | string[]
  users: User[]
  bookTitle: string
  handleCancel: () => void
}

const RatingForm: React.FC<Props> = ({
  id,
  users,
  bookTitle,
  handleCancel,
}) => {
  const rating = useAppSelector(
    (state) => state.bookFormData.formData.scoreRatings.rating,
  ) as number
  const scoreRatings = useAppSelector(
    (state) => state.bookFormData.formData.scoreRatings,
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Rating successfully submitted",
      description: "Thank you for your rating. The club lives on",
    },
    error: {
      title: "Error occurred",
      description: "Rating not submitted. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    CreateRatingPayload,
    Book
  >({
    apiPath: `${API_CREATE_RATING}${id}`,
    method: "post",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", `${id}`],
    onSuccessCallback: () => {
      handleCancel()
    },
  })

  const onSubmit = () => {
    mutate(scoreRatings)
  }

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        scoreRatings: { rating: 0 },
      }),
    )
  }, [id])

  return (
    <>
      <Form
        onFinish={onSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        <InputConfigWrapper>
          {/* rating */}
          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please rate the book with a score between 0 to 10",
              },
            ]}
          >
            <Input
              min={0}
              max={10}
              type="number"
              step="0.25"
              onChange={(e) => {
                if (Number(e.target.value) > 10 || Number(e.target.value) < 0) {
                  return
                }
                dispatch(
                  setFormData({
                    ...formData,
                    scoreRatings: { rating: Number(e.target.value) },
                  }),
                )
              }}
              value={Number(rating)}
            />
          </Form.Item>
        </InputConfigWrapper>
        <ScorePreview users={users} rating={rating} bookTitle={bookTitle} />
        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <UiButton
            textContent="Submit"
            loading={isPending}
            htmlType="submit"
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default RatingForm
