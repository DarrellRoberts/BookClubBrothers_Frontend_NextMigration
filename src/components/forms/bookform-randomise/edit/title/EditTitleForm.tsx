/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  setTitle: React.Dispatch<React.SetStateAction<object>>;
  formData: object;
};

const EditTitleForm: React.FC<Props> = ({ setTitle, formData }) => {
  return (
    <Form.Item
      label="Title"
      name="title"
      rules={
        formData["title"]
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
        onChange={(e) => setTitle({ ...formData, title: e.target.value })}
        defaultValue={formData["title"]}
        value={formData["title"]}
      />
    </Form.Item>
  );
};

export default EditTitleForm;
