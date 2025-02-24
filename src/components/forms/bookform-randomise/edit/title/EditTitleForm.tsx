/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/randomise/randomiseEditSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditTitleForm = ({ inTitle }) => {
  const formData = useAppSelector((state) => state.randomiseEdit.formData);
  const title = useAppSelector((state) => state.randomiseEdit.formData.title);
  const dispatch = useAppDispatch();
  return (
    <Form.Item
      label="Title"
      name="title"
      rules={
        title
          ? null
          : [
              {
                required: true,
                message: "Please write the name of the book title!",
              },
            ]
      }
    >
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, title: e.target.value }))
        }
        defaultValue={inTitle}
        value={title}
      />
    </Form.Item>
  );
};

export default EditTitleForm;
