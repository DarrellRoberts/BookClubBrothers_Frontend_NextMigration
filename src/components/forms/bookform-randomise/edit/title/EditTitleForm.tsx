/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"

const EditTitleForm = ({ errorObject, setErrorObject }) => {
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const title = useAppSelector((state) => state.bookFormData.formData.title)
  const dispatch = useAppDispatch()
  return (
    <Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          validator(_, value) {
            const textRegex = /^[a-zA-Z0-9\s-\s?\s!\s']+$/
            if (!textRegex.test(value) || value.length >= 40) {
              setErrorObject({ ...errorObject, title: false })
              return Promise.reject()
            }
            if (textRegex.test(value) && value.length < 40) {
              setErrorObject({ ...errorObject, title: true })
              return Promise.resolve()
            }
          },
          message:
            "Please write the title of the book. No special characters allowed",
        },
      ]}
    >
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, title: e.target.value }))
        }
        value={title}
      />
    </Form.Item>
  )
}

export default EditTitleForm
