/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/randomise/randomiseEditSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditImageURLForm = ({ inImageURL }) => {
  const formData = useAppSelector((state) => state.randomiseEdit.formData);
  const imageURL = useAppSelector(
    (state) => state.randomiseEdit.formData.imageURL
  );
  const dispatch = useAppDispatch();
  return (
    <Form.Item label="Image URL" name="image URL">
      <Input
        type="text"
        onChange={(e) =>
          dispatch(setFormData({ ...formData, imageURL: e.target.value }))
        }
        defaultValue={inImageURL}
        value={imageURL}
      />
    </Form.Item>
  );
};

export default EditImageURLForm;
