/* eslint-disable react/react-in-jsx-scope */
"use client"

import useForm from "@/hooks/crud-hooks/useForm"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button, Form, Input } from "antd"

type Props = {
  id: string | string[]
  inAuthor: string
}

const EditBookAuthor: React.FC<Props> = ({ id, inAuthor }) => {
  const author = useAppSelector((state) => state.bookFormData.formData.author)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT",
    { author }
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
        initialValues={{
          author: inAuthor,
        }}
      >
        {/* Author */}
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please write the name of the author!",
            },
          ]}
        >
          <Input
            onChange={(e) =>
              dispatch(setFormData({ ...formData, author: e.target.value }))
            }
            value={author}
          />
        </Form.Item>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            className="loginButtons"
            loading={loadings}
            onClick={() => enterLoading()}
            htmlType="submit"
          >
            Submit
          </Button>
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditBookAuthor
