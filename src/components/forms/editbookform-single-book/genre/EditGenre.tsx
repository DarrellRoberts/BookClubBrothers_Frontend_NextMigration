"use client"

import { Form, Select, Space } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { API_EDIT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../../InputConfigWrapper"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { EditBookPayload } from "@/types/Api"
import { Book } from "@/types/BookInterface"
import { genres } from "@/configs/genre"

const { Option } = Select

type Props = {
  id: string | string[]
  inGenre: Array<string>
}

const EditGenre: React.FC<Props> = ({ id, inGenre }) => {
  const genre = useAppSelector((state) => state.bookFormData.formData.genre)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

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
    Pick<EditBookPayload, "genre">,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id as string],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({ genre })
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
          genre: inGenre,
        }}
      >
        {/* Genre */}
        <InputConfigWrapper labelColor="#000000">
          <Form.Item label="Genre" name="genre">
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Select the genres"
              optionLabelProp="label"
              onChange={(e) => dispatch(setFormData({ ...formData, genre: e }))}
              value={genre}
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
            htmlType="submit"
            loading={isPending}
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditGenre
