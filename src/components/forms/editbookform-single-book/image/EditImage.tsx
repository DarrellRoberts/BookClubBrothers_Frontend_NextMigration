"use client"

import { useState } from "react"
import axios from "axios"
import { Button, Form, Upload } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useAppSelector } from "@/store/lib/hooks"
import { API_EDIT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../../InputConfigWrapper"

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

interface props {
  id: string | string[]
}

interface imageInt {
  image: string
  name?: string
  size: number
  type: string
  text: () => Promise<string>
  arrayBuffer: () => Promise<ArrayBuffer>
  slice: {
    (start?: number, end?: number, contentType?: string)
  }
  stream: () => ReadableStream<Uint8Array>
}

const EditImage: React.FC<props> = ({ id }) => {
  const [image, setImage] = useState<Blob>()
  const [error, setError] = useState("")
  const [loadings, setLoadings] = useState(false)
  const token = useAppSelector((state) => state.token.tokenState)

  const [form] = Form.useForm()

  const handleSubmit = async () => {
    setLoadings(true)
    try {
      const formData = new FormData()
      formData.append("picture", image)
      await axios.post(`${API_EDIT_BOOK}${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong",
      )
      console.error(error)
    } finally {
      setLoadings(false)
    }
  }

  const handleImageChange = (info) => {
    setImage(info.file)
    console.log(info)
  }

  return (
    <>
      <Form
        form={form}
        onFinish={handleSubmit}
        name="picture_upload_form"
        initialValues={{ fileList: [] }}
      >
        {/* <InputConfigWrapper> */}
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
        {/* </InputConfigWrapper> */}

        <UiButton textContent="Submit" htmlType="submit" loading={loadings} />

        {error ? <p>{error}</p> : null}
      </Form>
    </>
  )
}

export default EditImage
