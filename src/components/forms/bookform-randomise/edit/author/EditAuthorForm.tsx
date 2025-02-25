/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditAuthorForm = () => {
  const formData = useAppSelector((state) => state.bookFormData.formData);
  const author = useAppSelector((state) => state.bookFormData.formData.author);
  const dispatch = useAppDispatch();

  return (
    <Form.Item
      label="Author"
      name="author"
      rules={
        author
          ? null
          : [
              {
                required: true,
                message: "Please write the name of the author!",
              },
            ]
      }
    >
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, author: e.target.value }))
        }
        value={author}
      />
    </Form.Item>
  );
};

export default EditAuthorForm;
