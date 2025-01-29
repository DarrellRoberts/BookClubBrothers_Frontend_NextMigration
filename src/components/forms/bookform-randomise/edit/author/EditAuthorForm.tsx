/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>
};

const EditAuthorForm: React.FC<Props> = ({ author, setAuthor }) => {

  return (
    <Form.Item
      label="Author"
      name="author"
      rules={[
        {
          required: true,
          message: "Please write the name of the author!",
        },
      ]}
    >
      <Input
        type="text"
        onChange={(e) => setAuthor(e.target.value)}
        defaultValue={author}
        value={author}
      />
    </Form.Item>
  );
};

export default EditAuthorForm;
