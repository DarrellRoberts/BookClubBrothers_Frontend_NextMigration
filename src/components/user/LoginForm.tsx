"use client"

import { Button, ConfigProvider, Form, Input } from "antd"
import { useState } from "react"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { UiButton } from "../ui/button/UiButton"

interface Login {
  setLoginOpen: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

const LoginForm: React.FC<Login> = ({ setLoginOpen }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loadings, setLoadings] = useState([false])

  const { login } = useAuth()

  const handleSubmit = async () => {
    try {
      setError(null)
      setLoadings([true])
      const response = await fetch(
        "https://bookclubbrothers-backend.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        setLoadings([false])
      }

      if (response.ok) {
        setTimeout(() => {
          localStorage.setItem("username", username)
          login(data.token)
          setLoadings([false])
          setLoginOpen(false)
        }, 5000)
      }
    } catch (err) {
      setError(err)
      console.log(error)
    }
  }

  const inputTheme = {
    components: {
      Input: {
        colorText: "black",
      },
    },
  }

  return (
    <>
      <div>
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
          autoComplete="on"
        >
          <ConfigProvider theme={inputTheme}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "There is a box with no username. Fill it out!",
                },
              ]}
            >
              <Input
                type="username"
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
                value={username}
              />
            </Form.Item>
          </ConfigProvider>

          <ConfigProvider theme={inputTheme}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Stop messing around. Enter your password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Form.Item>
          </ConfigProvider>
          {error ? (
            <h4 className="bg-black mb-4 p-4 font-bold text-red-500 text-center">
              {error}
            </h4>
          ) : null}

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <UiButton
              textContent={"Submit"}
              htmlType="submit"
              ghost
              loading={loadings[0]}
            />
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginForm
