"use client"

import { useState } from "react"
import { Form, Select, Space } from "antd"
import { UiButton } from "@/components/ui/button/UiButton"
import { API_EDIT_USER } from "@/configs/config"
import { User } from "@/types/UserInterface"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { genres } from "@/configs/genre"
import { EditUserPayload } from "@/types/Api"
import { InputConfigWrapper } from "../InputConfigWrapper"
import { useAppDispatch } from "@/store/lib/hooks"
import { setShowGenre } from "@/store/lib/features/auth/editButtonsSlice"

const { Option } = Select

interface props {
  id: string
  inGenre: string[] | null
}

const EditGenre: React.FC<props> = ({ id, inGenre }) => {
  const [favGenre, setFavGenre] = useState(inGenre?.map((genre) => `${genre}`))

  const dispatch = useAppDispatch()

  const handleCancel = () => {
    dispatch(setShowGenre())
  }

  const toastObject = {
    success: {
      title: "Genre successfully edited",
      description: "Genre has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Genre not edited. Please contact me",
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
    mutate({ userInfo: { favGenre } })
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
        {/* Genre */}
        <InputConfigWrapper labelColor="#000000">
          <Form.Item htmlFor="favGenre" name="Genres">
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Select the genres"
              optionLabelProp="label"
              value={favGenre}
              defaultValue={favGenre}
              onChange={setFavGenre}
            >
              {genres.map((genre) => (
                <Option
                  value={genre.label}
                  label={genre.label}
                  key={genre.label}
                >
                  <Space>
                    <span role="img" aria-label={genre.label}>
                      {genre.emoji}
                    </span>
                    {genre.label}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </InputConfigWrapper>

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

export default EditGenre
