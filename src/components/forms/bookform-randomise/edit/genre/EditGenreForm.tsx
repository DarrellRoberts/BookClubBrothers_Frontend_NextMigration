"use client"

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Form, Select, Space } from "antd"
import { InputConfigWrapper } from "../../../InputConfigWrapper"
import { genres } from "@/configs/genre"

const { Option } = Select

const EditGenreForm = () => {
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const genre = useAppSelector((state) => state.bookFormData.formData.genre)
  const dispatch = useAppDispatch()
  return (
    <InputConfigWrapper>
      <Form.Item label="Genre" name="genre" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="Select the genres"
          optionLabelProp="label"
          value={genre}
          onChange={(e) => dispatch(setFormData({ ...formData, genre: e }))}
        >
          {genres.map((genre) => (
            <Option value={genre.value} label={genre.label} key={genre.label}>
              <Space>
                <span aria-label={genre.value}>{genre.label}</span>
              </Space>
            </Option>
          ))}
        </Select>
      </Form.Item>
    </InputConfigWrapper>
  )
}

export default EditGenreForm
