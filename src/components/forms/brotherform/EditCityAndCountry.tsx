"use client"

import { useState } from "react"
import { Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { API_EDIT_USER, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiInput } from "@/components/ui/input/UiInput"
import { EditUserPayload } from "@/types/Api"
import { User } from "@/types/UserInterface"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { setShowCountry } from "@/store/lib/features/auth/editButtonsSlice"

interface props {
  id: string
  inCity: string
  inCountry: string
}

const EditCityAndCountry: React.FC<props> = ({ id, inCity, inCountry }) => {
  const [country, setCountry] = useState(inCountry)
  const [city, setCity] = useState(inCity)

  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setShowCountry())
  }

  const toastObject = {
    success: {
      title: "Residence successfully edited",
      description: "Residence has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Residence not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    EditUserPayload,
    User
  >({
    apiPath: `${API_EDIT_USER}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["users"],
    onSuccessCallback: () => handleCancel(),
  })

  const onSubmit = () => {
    mutate({ userInfo: { residence: { country, city } } })
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
        {/* Country */}
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              message: "Please write your country",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => setCountry(e.target.value)}
            defaultValue={country}
            value={country}
            type="text"
          />
        </Form.Item>

        {/* City */}
        <Form.Item
          label="City"
          name="city"
          rules={[
            {
              message: "Please write your city",
            },
          ]}
        >
          <UiInput
            handleChange={(e) => setCity(e.target.value)}
            defaultValue={city}
            value={city}
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

export default EditCityAndCountry
