"use client"

import { API_EDIT_BOOK } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Input } from "antd"
import { InputConfigWrapper } from "../../InputConfigWrapper"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"
import { EditBookPayload } from "@/types/Api"

type Props = {
  id: string | string[]
  inAuthor: string
}

const EditBookAuthor: React.FC<Props> = ({ id, inAuthor }) => {
  const author = useAppSelector((state) => state.bookFormData.formData.author)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Author successfully edited",
      description: "Author has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Author not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    Pick<EditBookPayload, "author">,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id as string],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({ author })
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
          author: inAuthor,
        }}
      >
        <InputConfigWrapper labelColor="#000000">
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
            htmlType="submit"
            loading={isPending}
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditBookAuthor
