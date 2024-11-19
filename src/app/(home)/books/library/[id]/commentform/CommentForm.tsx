/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import { Button, Form, Input } from "antd";
import useForm from "@/hooks/post-hooks/useForm";

const { TextArea } = Input;

interface props {
  id: string | string[];
}

const CommentForm: React.FC<props> = ({ id }) => {
  const [loadings, setLoadings] = useState(false);

  const { handleSubmit, error, formData, setFormData } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/comment/${id}`,
    { comments: "" },
    "POST"
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
        {/* comment */}
        <Form.Item label="Comment" name="comment">
          <TextArea
            rows={8}
            placeholder="Say a few words about the book"
            onChange={(e) => setFormData({ comments: e.target.value })}
            value={formData["comments"]}
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

export default CommentForm;
