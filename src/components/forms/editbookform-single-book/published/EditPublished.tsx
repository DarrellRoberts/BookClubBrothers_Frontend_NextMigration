"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../../InputConfigWrapper"

type Props = {
  id: string | string[]
  inPublish: number
}

const EditPublished: React.FC<Props> = ({ id, inPublish }) => {
  const yearPublished = useAppSelector(
    (state) => state.bookFormData.formData.yearPublished
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `${config.API_URL}/books/${id}`,
    "PUT",
    { yearPublished }
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
          yearPublished: inPublish,
        }}
      >
        {/* Year Published */}
        <InputConfigWrapper>
          <Form.Item
            label="yearPublished"
            name="yearPublished"
            rules={[
              {
                required: true,
                message: "Please write the name of the author!",
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

export default EditPublished
