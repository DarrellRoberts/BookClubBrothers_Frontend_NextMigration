"use client"

import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useForm from "@/hooks/crud-hooks/useForm"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button, Form, Input } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"

type Props = {
  id: string | string[]
  inTitle: string
}

const EditTitle: React.FC<Props> = ({ id, inTitle }) => {
  const title = useAppSelector((state) => state.bookFormData.formData.title)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `${config.API_URL}/books/${id}`,
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
        <InputConfigWrapper>
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
        </InputConfigWrapper>

        {/* Submission */}
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

export default EditTitle
