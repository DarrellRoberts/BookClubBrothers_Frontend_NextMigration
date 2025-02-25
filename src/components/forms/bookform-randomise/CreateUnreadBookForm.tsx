/* eslint-disable react/react-in-jsx-scope */
import { Button, Form, Input, Space, Select } from "antd";
import "@/style/createbook.css";
import useForm from "@/hooks/crud-hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice";

const { Option } = Select;

const CreateBook: React.FC = () => {
  const { handleSubmit, error, enterLoading, loadings } = useForm(
    "https://bookclubbrothers-backend.onrender.com/books/unread/create",
    "POST"
  );
  const formData = useAppSelector((state) => state.bookFormData.formData);
  const dispatch = useAppDispatch();

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
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message:
                "Please write the name of book! How else we will know which book it is?",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) =>
              dispatch(setFormData({ ...formData, title: e.target.value }))
            }
            value={formData["title"]}
          />
        </Form.Item>

        {/* Author */}
        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please write the name of the author!",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) =>
              dispatch(setFormData({ ...formData, author: e.target.value }))
            }
            value={formData["author"]}
          />
        </Form.Item>

        <Form.Item
          label="Pages"
          name="pages"
          rules={[
            {
              required: true,
              message: "Please write the number of pages (i'm curious)!",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) =>
              dispatch(
                setFormData({ ...formData, pages: Number(e.target.value) })
              )
            }
            value={formData["pages"]}
          />
        </Form.Item>

        <Form.Item
          label="Year Published"
          name="year"
          rules={[
            {
              required: true,
              message: "Please write the year it was published (I'm curious)!",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) =>
              dispatch(
                setFormData({
                  ...formData,
                  yearPublished: Number(e.target.value),
                })
              )
            }
            value={formData["yearPublished"]}
          />
        </Form.Item>

        {/* select genres */}
        <Form.Item
          label="Genres"
          htmlFor="genre"
          name="Genres"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            style={{
              width: "100%",
            }}
            placeholder="Select the genres"
            optionLabelProp="label"
            onChange={(e) => dispatch(setFormData({ ...formData, genre: e }))}
            value={formData["genre"]}
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
                Non-fiction
              </Space>
            </Option>
          </Select>
        </Form.Item>

        {/* ImageURL */}
        <Form.Item label="Image URL" name="image">
          <Input
            type="text"
            onChange={(e) =>
              dispatch(setFormData({ ...formData, imageURL: e.target.value }))
            }
            value={formData["imageURL"]}
          />
        </Form.Item>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            ghost
            className="loginButtons"
            loading={loadings}
            onClick={() => enterLoading()}
            htmlType="submit"
          >
            Submit
          </Button>
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateBook;
