"use client"

import { useState } from "react"
import { Button, Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { API_EDIT_USERNAME, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiInput } from "@/components/ui/input/UiInput"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { EditUsernamePayload } from "@/types/Api"
import { User } from "@/types/UserInterface"
import { setShowUsername } from "@/store/lib/features/auth/editButtonsSlice"

interface props {
  id: string
  inUsername: string
}

const EditUsername: React.FC<props> = ({ id, inUsername }) => {
  const [username, setUsername] = useState(inUsername)

  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setShowUsername())
  }

  const toastObject = {
    success: {
      title: "Username successfully edited",
      description: "Username has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Username not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    EditUsernamePayload,
    User
  >({
    apiPath: `${API_EDIT_USERNAME}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["users"],
    onSuccessCallback: () => handleCancel(),
  })

  const onSubmit = () => {
    mutate({ username })
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
          remember: true,
        }}
      >
        {/* Username */}
        <Form.Item
          name="username"
          rules={[
            {
              required: username ? false : true,
              message: "Please write your username",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => {
              setUsername(e.target.value)
            }}
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
            loading={isPending}
            htmlType="submit"
            ghost
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditUsername
