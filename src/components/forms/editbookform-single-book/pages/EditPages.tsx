"use client"

import { Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { API_EDIT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../../InputConfigWrapper"
import { EditBookPayload } from "@/types/Api"
import { Book } from "@/types/BookInterface"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"

type Props = {
  id: string | string[]
  inPages: number
}

const EditPages: React.FC<Props> = ({ id, inPages }) => {
  const pages = useAppSelector((state) => state.bookFormData.formData.pages)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Pages successfully edited",
      description: "Pages has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Pages not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    Pick<EditBookPayload, "pages">,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id as string],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({ pages })
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
          pages: inPages,
        }}
      >
        {/* Pages */}
        <InputConfigWrapper labelColor="#000000">
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
                  setFormData({ ...formData, pages: Number(e.target.value) }),
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
            htmlType="submit"
            loading={isPending}
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditPages
