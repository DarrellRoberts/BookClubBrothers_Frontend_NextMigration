/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import useForm from "@/hooks/post-hooks/useForm";
import { Button, Form, Input } from "antd";

type Props = {
  id: string | string[];
  inAuthor: string;
};

const EditBookAuthor: React.FC<Props> = ({ id, inAuthor }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/${id}`,
      { author: inAuthor },
      "PUT"
    );
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
            onChange={(e) => setFormData({ author: e.target.value })}
            defaultValue={formData["author"]}
            value={formData["author"]}
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

export default EditBookAuthor;
