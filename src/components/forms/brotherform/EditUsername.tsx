"use client"

import { useState } from "react"
import { Button, Form, Input } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiInput } from "@/components/ui/input/UiInput"

interface props {
  id: string
  inUsername: string
}

const EditUsername: React.FC<props> = ({ id, inUsername }) => {
  const [username, setUsername] = useState(inUsername)
  const [error, setError] = useState("")
  const [loadings, setLoadings] = useState([])

  const token = useAppSelector((state) => state.token.tokenState)

  const handleSubmit = async () => {
    try {
      setError(null)
      const response = await fetch(`${config.API_URL}/users/username/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error)
        console.log("something has happened")
      }

      if (response.ok) {
        return
      }
    } catch (error) {
      setError(error)
      console.log(error)
    }
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
    }, 500)
  }
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
        {/* Username */}
        <Form.Item
          // label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please write your username",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
            value={username}
            type="text"
          />
        </Form.Item>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <UiButton
            textContent="Submit"
            loading={loadings[0]}
            clickHandler={() => enterLoading(0)}
            htmlType="submit"
            ghost
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditUsername
