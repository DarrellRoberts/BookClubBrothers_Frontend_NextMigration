/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button, Form, Input } from "antd";
import useForm from "@/hooks/crud-hooks/useForm";

interface props {
  id: string | string[];
}

const RatingForm: React.FC<props> = ({ id }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/rating/${id}`,
      { rating: 0 },
      "POST"
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
        {/* rating */}
        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            {
              required: true,
              message: "Please rate the book with a score between 0 to 10",
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ rating: e.target.value })}
            value={formData["rating"]}
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

export default RatingForm;
