"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useEffect } from "react"
import { User } from "@/types/UserInterface"
import ScorePreview from "./ScorePreview"
import { API_EDIT_RATING, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../InputConfigWrapper"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"

type Props = {
  id: string | string[]
  initialRating: number
  users: User[]
  bookTitle: string
  handleCancel: () => void
}

const EditRatingForm: React.FC<Props> = ({
  id,
  initialRating,
  users,
  bookTitle,
  handleCancel,
}) => {
  const rating = useAppSelector(
    (state) => state.bookFormData.formData.scoreRatings.rating,
  )
  const scoreRatings = useAppSelector(
    (state) => state.bookFormData.formData.scoreRatings,
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Rating successfully edited",
      description: "Rating has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Rating not edited. Please contact me",
    },
  }

  // const { mutate, isPending, isError, error } = useMutationQuery<
  //   EditCommentPayload,
  //   Book
  // >({
  //   apiPath: `${API_EDIT_RATING}${id}`,
  //   method: "put",
  //   toastObject: toastObject,
  //   queryKeyToInvalidate: ["books", id],
  //   onSuccessCallback: () => {
  //     handleCancel()
  //   },
  // })

  // const onSubmit = () => {
  //   mutate(scoreRatings)
  // }

  const { handleSubmit, error, loadings, enterLoading } = useForm(
    `${config.API_URL}/books/rating/edit/${id}`,
    "PUT",
    toastObject,
    { rating },
  )

  const handleLoading = () => {
    enterLoading()
    setTimeout(() => {
      handleCancel()
    }, 1250)
  }

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        scoreRatings: { rating: initialRating },
      }),
    )
  }, [id])
  return (
    <>
      <Form
        onFinish={handleSubmit}
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
        initialValues={{
          rating: initialRating,
        }}
      >
        <InputConfigWrapper>
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
              defaultValue={initialRating ?? 0}
              type="number"
              max={10}
              min={0}
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
        <ScorePreview
          users={users}
          rating={rating as number}
          initialRating={initialRating}
          bookTitle={bookTitle}
        />
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
            clickHandler={() => handleLoading()}
            htmlType="submit"
            ghost
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditRatingForm
