/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Button, Form, Input } from "antd";

const { TextArea } = Input;

interface props {
  id: string | string[];
}

const CommentForm: React.FC<props> = ({ id }) => {
  const [comments, setComment] = useState<string>();
  const [error, setError] = useState("");
  const [loadings, setLoadings] = useState(false);

  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books/comment/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comments,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log("something has happened");
      }

      if (response.ok) {
        console.log("SUCCESS!!!");
        console.log(response);
        console.log(data);
        console.log(comments);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const enterLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 2000);
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
            onChange={(e) => setComment(e.target.value)}
            value={comments}
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
