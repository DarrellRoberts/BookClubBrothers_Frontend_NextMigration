"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useEffect } from "react"
import { User } from "@/types/UserInterface"
import ScorePreview from "./ScorePreview"
import { config } from "@/configs/config"

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
    (state) => state.bookFormData.formData.scoreRatings.rating
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, loadings, enterLoading } = useForm(
    `${config.API_URL}/books/rating/edit/${id}`,
    "PUT",
    { rating }
  )

  const handleLoading = () => {
    enterLoading()
    setTimeout(() => {
      handleCancel()
    }, 4000)
  }

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        scoreRatings: { rating: initialRating },
      })
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
                })
              )
            }}
            value={Number(rating)}
          />
        </Form.Item>
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
          <Button
            type="primary"
            ghost
            className="loginButtons"
            loading={loadings}
            onClick={() => handleLoading()}
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditRatingForm
