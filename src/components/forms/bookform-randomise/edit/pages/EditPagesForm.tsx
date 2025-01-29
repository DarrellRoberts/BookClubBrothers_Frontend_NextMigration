/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  pages: number;
  setPages: React.Dispatch<React.SetStateAction<number>>;
};

const EditPagesForm: React.FC<Props> = ({ pages, setPages }) => {

  return (
    <Form.Item
      label="Pages"
      name="pages"
      rules={[
        {
          required: true,
          message: "Please write the number of pages!",
        },
      ]}
    >
      <Input
        type="number"
        onChange={(e) => setPages(Number(e.target.value))}
        defaultValue={pages}
        value={pages}
      />
    </Form.Item>
  );
};

export default EditPagesForm;
