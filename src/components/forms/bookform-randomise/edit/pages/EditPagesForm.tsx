/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/randomise/randomiseEditSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditPagesForm = ({ inPages }) => {
  const formData = useAppSelector((state) => state.randomiseEdit.formData);
  const pages = useAppSelector((state) => state.randomiseEdit.formData.pages);
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
        defaultValue={inPages}
        value={pages}
      />
    </Form.Item>
  );
};

export default EditPagesForm;
