/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import useForm from "@/hooks/crud-hooks/useForm"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button, Form, Input } from "antd"

type Props = {
  id: string | string[]
  inTitle: string
}

const EditTitle: React.FC<Props> = ({ id, inTitle }) => {
  const title = useAppSelector((state) => state.bookFormData.formData.title)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT",
    { title }
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
          title: inTitle,
        }}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please write the title of the book!",
            },
          ]}
        >
          <Input
            //   type="text"
            onChange={(e) =>
              dispatch(setFormData({ ...formData, title: e.target.value }))
            }
            value={title}
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

export default EditTitle
