/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditPagesForm = () => {
  const formData = useAppSelector((state) => state.bookFormData.formData);
  const pages = useAppSelector((state) => state.bookFormData.formData.pages);
  const dispatch = useAppDispatch();
  return (
    <Form.Item
      label="Pages"
      name="pages"
      rules={
        pages
          ? null
          : [
              {
                required: true,
                message: "Please write the number of pages!",
              },
            ]
      }
    >
      <Input
        type="number"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, pages: Number(e.target.value) }))
        }
        value={pages}
      />
    </Form.Item>
  );
};

export default EditPagesForm;
