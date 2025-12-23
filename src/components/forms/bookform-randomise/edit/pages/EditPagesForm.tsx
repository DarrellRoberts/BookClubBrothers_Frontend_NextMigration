"use client"

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"
import { InputConfigWrapper } from "../../../InputConfigWrapper"

const EditPagesForm = ({ errorObject, setErrorObject }) => {
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const pages = useAppSelector((state) => state.bookFormData.formData.pages)
  const dispatch = useAppDispatch()
  return (
    <InputConfigWrapper>
      <Form.Item
        label="Pages"
        name="pages"
        rules={[
          {
            required: true,
            validator(_, value) {
              const numberRegex = /^(50|[1-9]\d{2}|1\d{3}|2000)$/
              if (!numberRegex.test(value)) {
                setErrorObject({ ...errorObject, pages: false })
                return Promise.reject()
              }
              if (numberRegex.test(value)) {
                setErrorObject({ ...errorObject, pages: true })
                return Promise.resolve()
              }
            },
            message: "The number of pages must be between 50 and 2000",
          },
        ]}
      >
        <Input
          type="number"
          onChange={(e) =>
            dispatch(
              setFormData({ ...formData, pages: Number(e.target.value) })
            )
          }
          value={pages}
        />
      </Form.Item>
    </InputConfigWrapper>
  )
}

export default EditPagesForm
