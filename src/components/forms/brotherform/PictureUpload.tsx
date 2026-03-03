"use client"

import { useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Upload, Form } from "antd"
import { useAppDispatch } from "@/store/lib/hooks"
import { API_EDIT_AVATAR } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { User } from "@/types/UserInterface"
import { setShowImage } from "@/store/lib/features/auth/editButtonsSlice"

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

type Props = {
  id: string
  inImage: string
}

const PictureUpload = ({ id, inImage }: Props) => {
  const [form] = Form.useForm() // Create a form instance
  const [image, setImage] = useState<File | null>()

  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setShowImage())
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
    User
  >({
    apiPath: `${API_EDIT_AVATAR}${id}`,
    method: "post",
    toastObject: toastObject,
    queryKeyToInvalidate: ["users"],
    onSuccessCallback: () => handleCancel(),
  })

  const onSubmit = () => {
    if (!image) return
    const formData = new FormData()
    formData.append("avatar", image, image?.name)
    mutate(formData)
  }

  const handleImageChange = (info: any) => {
    setImage(info.file)
  }
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      name="picture_upload_form"
      initialValues={{ fileList: [] }}
    >
      <div className="flex justify-center round mb-10">
        <img
          key={inImage}
          className="rounded"
          src={inImage}
          alt="profile_pic"
          width="200px"
        />
      </div>
      <Form.Item
        name="fileList"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="picture"
          listType="picture-card"
          onChange={handleImageChange}
          beforeUpload={() => false}
        >
          <div>
            <PlusOutlined />
            <div className="text-white" style={{ marginTop: 8 }}>
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <UiButton
        textContent="Submit"
        loading={isPending}
        htmlType="submit"
        ghost
      />
      {isError ? <p>{error.message}</p> : null}
    </Form>
  )
}

export default PictureUpload
