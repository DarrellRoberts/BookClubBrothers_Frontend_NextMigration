/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  formData: object;
  setImageURL: React.Dispatch<React.SetStateAction<object>>;
};

const EditImageURLForm: React.FC<Props> = ({ formData, setImageURL }) => {
  return (
    <Form.Item label="Image URL" name="image URL">
      <Input
        type="text"
        onChange={(e) => setImageURL({ ...formData, imageURL: e.target.value })}
        defaultValue={formData["imageURL"]}
        value={formData["imageURL"]}
      />
    </Form.Item>
  );
};

export default EditImageURLForm;
