/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  formData: object;
  setAuthor: React.Dispatch<React.SetStateAction<object>>;
};

const EditAuthorForm: React.FC<Props> = ({ formData, setAuthor }) => {
  return (
    <Form.Item
      label="Author"
      name="author"
      rules={
        formData["author"]
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
        onChange={(e) => setAuthor({ ...formData, author: e.target.value })}
        defaultValue={formData["author"]}
        value={formData["author"]}
      />
    </Form.Item>
  );
};

export default EditAuthorForm;
