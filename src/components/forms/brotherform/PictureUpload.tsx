"use client"

import { useState } from "react"
import axios from "axios"
import { PlusOutlined } from "@ant-design/icons"
import { Upload, Form, Button } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e
  }
  return e && e.fileList
}

interface props {
  id: string
  inImage: string
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

const PictureUpload: React.FC<props> = ({ id, inImage }) => {
  const token = useAppSelector((state) => state.token.tokenState)

  const [form] = Form.useForm() // Create a form instance
  const [image, setImage] = useState<imageInt>()
  const [error, setError] = useState(null)
  const [loadings, setLoadings] = useState([])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append("avatar", image, image?.name)
      await axios.post(`${config.API_URL}/users/upload/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      setError(error)
      console.error(error)
    }
  }

  const handleImageChange = (info) => {
    setImage(info.file)
  }

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings]
      newLoadings[index] = true
      return newLoadings
    })
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings]
        newLoadings[index] = false
        document.location.reload()
        return newLoadings
      })
    }, 4000)
  }

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      name="picture_upload_form"
      initialValues={{ fileList: [] }}
    >
      <div className="flex justify-center round mb-10">
        <img
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
          action={`${config.API_URL}/users/${id}`}
          listType="picture-card"
          onChange={handleImageChange}
          beforeUpload={() => false}
        >
          <div>
            <PlusOutlined />
            <PlusOutlined />
            <div className="text-white" style={{ marginTop: 8 }}>
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
      <UiButton
        textContent="Submit"
        loading={loadings[0]}
        clickHandler={() => enterLoading(0)}
        htmlType="submit"
        ghost
      />
      {error ? <p>{error}</p> : null}
    </Form>
  )
}

export default PictureUpload
