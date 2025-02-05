/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import useForm from "@/hooks/crud-hooks/useForm";
import { Button, Form, Input } from "antd";

type Props = {
  id: string | string[];
  inTitle: string;
};

const EditTitle: React.FC<Props> = ({ id, inTitle }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/${id}`,
      { title: inTitle },
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
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please write the title of the book!",
            },
          ]}
        >
          <Input
            //   type="text"
            onChange={(e) => setFormData({ title: e.target.value })}
            defaultValue={formData["title"]}
            value={formData["title"]}
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

export default EditTitle;
