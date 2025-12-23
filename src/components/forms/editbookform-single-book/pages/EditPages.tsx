"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../../InputConfigWrapper"

type Props = {
  id: string | string[]
  inPages: number
}

const EditPages: React.FC<Props> = ({ id, inPages }) => {
  const pages = useAppSelector((state) => state.bookFormData.formData.pages)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT",
    { pages }
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
          pages: inPages,
        }}
      >
        {/* Pages */}
        <InputConfigWrapper>
          <Form.Item
            label="Pages"
            name="pages"
            rules={[
              {
                required: true,
                message: "Please write the number of pages!",
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

export default EditPages
