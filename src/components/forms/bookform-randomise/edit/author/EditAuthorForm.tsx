/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"

const EditAuthorForm = ({ errorObject, setErrorObject }) => {
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const author = useAppSelector((state) => state.bookFormData.formData.author)
  const dispatch = useAppDispatch()

  return (
    <Form.Item
      label="Author"
      name="author"
      rules={[
        {
          required: true,
          validator(_, value) {
            const nameRegex = /^[a-zA-Z\s-\s']+$/
            if (
              !nameRegex.test(value) ||
              value.length <= 4 ||
              value.length >= 30
            ) {
              setErrorObject({ ...errorObject, author: false })
              return Promise.reject()
            }
            if (
              nameRegex.test(value) &&
              value.length > 4 &&
              value.length < 30
            ) {
              setErrorObject({ ...errorObject, author: true })
              return Promise.resolve()
            }
          },
          message:
            "Please write the name of the author. It must be more than 4 characters and no special characters nor numbers are allowed",
        },
      ]}
    >
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, author: e.target.value }))
        }
        value={author}
      />
    </Form.Item>
  )
}

export default EditAuthorForm
