"use client"

import { Button, Form, Select, Space } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { UiButton } from "@/components/ui/button/UiButton"

const { Option } = Select

type Props = {
  id: string | string[]
  inGenre: Array<string>
}

const EditGenre: React.FC<Props> = ({ id, inGenre }) => {
  const genre = useAppSelector((state) => state.bookFormData.formData.genre)
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT",
    { genre }
  )
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
          genre: inGenre,
        }}
      >
        {/* Genre */}
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
            <Option value="Horror" label="Horror">
              <Space>
                <span role="img" aria-label="Horror">
                  🧟
                </span>
                Horror
              </Space>
            </Option>
            <Option value="Thriller" label="Thriller">
              <Space>
                <span role="img" aria-label="Thriller">
                  🔪
                </span>
                Thriller
              </Space>
            </Option>
            <Option value="Comedy" label="Comedy">
              <Space>
                <span role="img" aria-label="Comedy">
                  🥸
                </span>
                Comedy
              </Space>
            </Option>
            <Option value="Romance" label="Romance">
              <Space>
                <span role="img" aria-label="Romance">
                  🌹
                </span>
                Romance
              </Space>
            </Option>
            <Option value="Fantasy" label="Fantasy">
              <Space>
                <span role="img" aria-label="Fantasy">
                  🧙‍♂️
                </span>
                Fantasy
              </Space>
            </Option>
            <Option value="Adventure" label="Adventure">
              <Space>
                <span role="img" aria-label="Adventure">
                  🏝️
                </span>
                Adventure
              </Space>
            </Option>
            <Option value="Anti-war" label="Anti-war">
              <Space>
                <span role="img" aria-label="Anti-war">
                  🪖
                </span>
                Anti-war
              </Space>
            </Option>
            <Option value="Drama" label="Drama">
              <Space>
                <span role="img" aria-label="Drama">
                  🎭
                </span>
                Drama
              </Space>
            </Option>
            <Option value="Action" label="Action">
              <Space>
                <span role="img" aria-label="Action">
                  💥
                </span>
                Action
              </Space>
            </Option>
            <Option value="Science-fiction" label="Science-fiction">
              <Space>
                <span role="img" aria-label="Science-fiction">
                  🤖
                </span>
                Science-fiction
              </Space>
            </Option>
            <Option value="Dystopian" label="Dystopian">
              <Space>
                <span role="img" aria-label="Dystopian">
                  👁️
                </span>
                Dystopian
              </Space>
            </Option>
            <Option value="Postmodern" label="Postmodern">
              <Space>
                <span role="img" aria-label="Postmodern">
                  🟥
                </span>
                Postmodern
              </Space>
            </Option>
            <Option value="Anthology" label="Anthology">
              <Space>
                <span role="img" aria-label="Anthology">
                  🤸
                </span>
                Anthology
              </Space>
            </Option>
            <Option value="Non-fiction" label="Non-fiction">
              <Space>
                <span role="img" aria-label="Non-fiction">
                  📈
                </span>
                Anthology
              </Space>
            </Option>
          </Select>
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
            clickHandler={() => enterLoading()}
            htmlType="submit"
            loading={loadings}
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditGenre
