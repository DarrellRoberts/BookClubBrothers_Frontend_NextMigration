/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
};

const EditTitleForm: React.FC<Props> = ({ title, setTitle }) => {

  return (
    <Form.Item
      label="Title"
      name="title"
      rules={[
        {
          required: true,
          message: "Please write the name of the book title!",
        },
      ]}
    >
      <Input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
        value={title}
      />
    </Form.Item>
  );
};

export default EditTitleForm;
