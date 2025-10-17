/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { User } from "@/types/UserInterface"
import ScorePreview from "./ScorePreview"

type Props = {
  id: string | string[]
  users: User[]
  bookTitle: string
}

const RatingForm: React.FC<Props> = ({ id, users, bookTitle }) => {
  const rating = useAppSelector(
    (state) => state.bookFormData.formData.scoreRatings.rating
  ) as number
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/rating/${id}`,
    "POST",
    { rating }
  )

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
      >
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
                })
              )
            }}
            value={Number(rating)}
          />
        </Form.Item>
        <ScorePreview users={users} rating={rating} bookTitle={bookTitle} />
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
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default RatingForm
