/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import useForm from "@/hooks/crud-hooks/useForm";
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Button, Form, DatePicker } from "antd";

type Props = {
  id: string | string[];
};

const EditActualDate: React.FC<Props> = ({ id }) => {
  const actualDateOfMeeting = useAppSelector(
    (state) => state.bookFormData.formData.actualDateOfMeeting
  );
  const formData = useAppSelector((state) => state.bookFormData.formData);
  const dispatch = useAppDispatch();

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT",
    { actualDateOfMeeting }
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
            onChange={(e) =>
              dispatch(
                setFormData({ ...formData, actualDateOfMeeting: e["$d"] })
              )
            }
            value={actualDateOfMeeting}
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
