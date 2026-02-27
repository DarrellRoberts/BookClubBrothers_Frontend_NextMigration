"use client"

import { API_EDIT_BOOK } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"
import { EditBookPayload } from "@/types/Api"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"

type Props = {
  id: string | string[]
  inTitle: string
}

const EditTitle: React.FC<Props> = ({ id, inTitle }) => {
  const title = useAppSelector((state) => state.bookFormData.formData.title)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Title successfully edited",
      description: "Title has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Title not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    Pick<EditBookPayload, "title">,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id as string],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({ title })
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
            htmlType="submit"
            loading={isPending}
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditTitle
