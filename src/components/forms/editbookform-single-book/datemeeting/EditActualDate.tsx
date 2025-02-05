/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import useForm from "@/hooks/crud-hooks/useForm";
import { Button, Form, DatePicker } from "antd";

type Props = {
  id: string | string[];
};

const EditActualDate: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error, formData, setFormData, enterLoading, loadings } =
    useForm(
      `https://bookclubbrothers-backend.onrender.com/books/${id}`,
      { actualDateOfMeeting: "" },
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
        {/* Date of Meeting */}
        <Form.Item label="Date of Meeting" name="Date of Meeting">
          <DatePicker
            onChange={(e) => setFormData({ actualDateOfMeeting: e["$d"] })}
            value={formData["actualDateOfMeeting"]}
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

export default EditActualDate;
