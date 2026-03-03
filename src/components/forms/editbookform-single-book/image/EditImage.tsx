"use client"

import { useState } from "react"
import { Form, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useAppDispatch } from "@/store/lib/hooks"
import { API_EDIT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { setShowBookImage } from "@/store/lib/features/books/editBookButtonsSlice"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

type Props = {
  id: string | string[]
}

const EditImage = ({ id }: Props) => {
  const [form] = Form.useForm() // Create a form instance
  const [image, setImage] = useState<File | null>()

  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setShowBookImage())
  }

  const toastObject = {
    success: {
      title: "Image successfully uploaded",
      description: "Image has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Image not uploaded. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    FormData,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "post",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books"],
    onSuccessCallback: () => handleCancel(),
  })

  const onSubmit = () => {
    if (!image) return
    const formData = new FormData()
    formData.append("picture", image, image?.name)
    mutate(formData)
  }

  const handleImageChange = (info: any) => {
    setImage(info.file)
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        name="picture_upload_form"
        initialValues={{ fileList: [] }}
      >
        <Form.Item
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="picture"
            action={`${config.API_URL}/users/${id}`}
            listType="picture-card"
            onChange={handleImageChange}
            beforeUpload={() => false}
          >
            {!image && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <UiButton textContent="Submit" htmlType="submit" loading={isPending} />

        {isError ? <p>{error.message}</p> : null}
      </Form>
    </>
  )
}

export default EditImage
