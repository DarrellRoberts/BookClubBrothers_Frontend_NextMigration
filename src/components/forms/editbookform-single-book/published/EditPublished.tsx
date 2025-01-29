/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Form, Input } from "antd";
import useForm from "@/hooks/post-hooks/useForm";

type Props = {
  id: string | string[];
  inPublish: number;
};

const EditPublished: React.FC<Props> = ({ id, inPublish }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/${id}`,
      { yearPublished: inPublish },
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
        {/* Year Published */}
        <Form.Item
          label="yearPublished"
          name="yearPublished"
          rules={[
            {
              required: true,
              message: "Please write the name of the author!",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) =>
              setFormData({ yearPublished: Number(e.target.value) })
            }
            defaultValue={formData["yearPublished"]}
            value={formData["yearPublished"]}
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

export default EditPublished;
