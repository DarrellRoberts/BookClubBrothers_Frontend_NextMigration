/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/books/bookFormDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditImageURLForm = () => {
  const formData = useAppSelector((state) => state.bookFormData.formData);
  const imageURL = useAppSelector(
    (state) => state.bookFormData.formData.imageURL
  );
  const dispatch = useAppDispatch();
  return (
    <Form.Item label="Image URL" name="imageURL">
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, imageURL: e.target.value }))
        }
        value={imageURL}
      />
    </Form.Item>
  );
};

export default EditImageURLForm;
