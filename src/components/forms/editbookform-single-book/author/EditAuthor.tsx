"use client"

import { UiButton } from "@/components/ui/button/UiButton"
import useForm from "@/hooks/crud-hooks/useForm"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button, Form, Input } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"

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
        <InputConfigWrapper>
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
        </InputConfigWrapper>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <UiButton
            textContent="Submit"
            clickHandler={() => enterLoading()}
            htmlType="submit"
            loading={loadings}
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditBookAuthor
