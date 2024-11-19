/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import useForm from "@/hooks/post-hooks/useForm";

interface props {
  id: string | string[];
  initialRating: number;
}

const EditRatingForm: React.FC<props> = ({ id, initialRating }) => {
  const [loadings, setLoadings] = useState(false);

  const { handleSubmit, error, formData, setFormData } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/rating/edit/${id}`,
    { rating: initialRating },
    "PUT"
  );

  const enterLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      document.location.reload();
    }, 4000);
  };
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
            defaultValue={initialRating ?? 0}
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

export default EditRatingForm;
