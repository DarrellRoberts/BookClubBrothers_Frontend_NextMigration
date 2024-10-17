/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  imageURL: string;
  setImageURL: React.Dispatch<React.SetStateAction<string>>
};

const EditImageURLForm: React.FC<Props> = ({ imageURL, setImageURL }) => {

  return (
    <Form.Item
      label="Image URL"
      name="image URL"
    >
      <Input
        type="text"
        onChange={(e) => setImageURL(e.target.value)}
        defaultValue={imageURL}
        value={imageURL}
      />
    </Form.Item>
  );
};

export default EditImageURLForm;
