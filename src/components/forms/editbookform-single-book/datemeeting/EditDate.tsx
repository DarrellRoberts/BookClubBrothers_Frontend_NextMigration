"use client"

import { API_EDIT_BOOK } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, DatePicker } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"
import { EditBookPayload } from "@/types/Api"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"

type Props = {
  id: string | string[]
}

const EditDate: React.FC<Props> = ({ id }) => {
  const dateOfMeeting = useAppSelector(
    (state) => state.bookFormData.formData.dateOfMeeting,
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Date successfully edited",
      description: "Date has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Date not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    Pick<EditBookPayload, "dateOfMeeting">,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id as string],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({ dateOfMeeting })
  }
  return (
    <>
      <Form
        onFinish={onSubmit}
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
        <InputConfigWrapper labelColor="#000000">
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
            htmlType="submit"
            loading={isPending}
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditDate
