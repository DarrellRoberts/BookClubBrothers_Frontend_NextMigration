"use client"

import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useForm from "@/hooks/crud-hooks/useForm"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button, Form, DatePicker } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"

type Props = {
  id: string | string[]
}

const EditDate: React.FC<Props> = ({ id }) => {
  const dateOfMeeting = useAppSelector(
    (state) => state.bookFormData.formData.dateOfMeeting
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `${config.API_URL}/books/${id}`,
    "PUT",
    { dateOfMeeting }
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
          remember: true,
        }}
      >
        {/* Date of Meeting */}
        <InputConfigWrapper>
          <Form.Item label="Date of Meeting" name="Date of Meeting">
            <DatePicker
              onChange={(e) =>
                dispatch(setFormData({ ...formData, dateOfMeeting: e["$d"] }))
              }
              value={dateOfMeeting}
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

export default EditDate
