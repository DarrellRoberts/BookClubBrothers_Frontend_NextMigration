"use client"

import { ConfigProvider, Form, Input } from "antd"
import { useState } from "react"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { UiButton } from "../ui/button/UiButton"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { API_LOGIN_USER } from "@/configs/config"
import { LoginUserPayload } from "@/types/Api"

type Props = {
  setLoginOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginForm = ({ setLoginOpen }: Props) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const { login } = useAuth()

  const toastObject = {
    success: {
      title: "Login successful",
      description: "Have fun!",
    },
    error: {
      title: "Login unsuccessful",
      description: "Check the errors in the login form",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    LoginUserPayload,
    any
  >({
    apiPath: `${API_LOGIN_USER}`,
    method: "post",
    toastObject: toastObject,
    onSuccessCallback: (data) => {
      localStorage.setItem("username", username)
      login(data.token)
      setLoginOpen(false)
    },
  })

  const onSubmit = () => {
    mutate({ username, password })
  }

  const inputTheme = {
    components: {
      Input: {
        colorText: "black",
        icons: {
          color: "red",
        },
      },
    },
  }

  return (
    <div>
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
              styles={{
                suffix: {
                  background: "#095d09",
                  borderRadius: "20px",
                  padding: "0.25rem",
                },
              }}
            />
          </Form.Item>
        </ConfigProvider>
        {isError ? (
          <h4 className="bg-black mb-4 p-4 font-bold text-red-500 text-center">
            {error?.response?.data?.error}
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
            loading={isPending}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
