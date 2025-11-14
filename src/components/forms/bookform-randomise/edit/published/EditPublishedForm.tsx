"use client"

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"

const EditPublishedForm = ({ errorObject, setErrorObject }) => {
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const yearPublished = useAppSelector(
    (state) => state.bookFormData.formData.yearPublished
  )
  const dispatch = useAppDispatch()
  return (
    <Form.Item
      label="Year Published"
      name="yearPublished"
      rules={[
        {
          required: true,
          validator(_, value) {
            const yearRegex = /^(1\d{3}|2\d{3}|3000)$/
            if (!yearRegex.test(value)) {
              setErrorObject({ ...errorObject, pages: false })
              return Promise.reject()
            }
            if (yearRegex.test(value)) {
              setErrorObject({ ...errorObject, pages: true })
              return Promise.resolve()
            }
          },
          message:
            "Please write the year it was published in a 4-digit format between 1000 and 3000",
        },
      ]}
    >
      <Input
        type="number"
        onChange={(e) =>
          dispatch(
            setFormData({
              ...formData,
              yearPublished: Number(e.target.value),
            })
          )
        }
        value={yearPublished}
      />
    </Form.Item>
  )
}

export default EditPublishedForm
