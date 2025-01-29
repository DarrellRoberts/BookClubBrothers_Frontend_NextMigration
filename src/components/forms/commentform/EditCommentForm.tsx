/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button, Form, Input } from "antd";
import useForm from "@/hooks/post-hooks/useForm";

const { TextArea } = Input;

type Props = {
  id: string | string[];
  inComment: string;
};

const EditRatingForm: React.FC<Props> = ({ id, inComment }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/comment/edit/${id}`,
      { comments: inComment },
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
        {/* comment */}
        <Form.Item label="Comment" name="comment">
          <TextArea
            rows={8}
            placeholder="Say a few words about the book"
            onChange={(e) => setFormData({ comments: e.target.value })}
            defaultValue={formData["comments"]}
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

export default EditRatingForm;
