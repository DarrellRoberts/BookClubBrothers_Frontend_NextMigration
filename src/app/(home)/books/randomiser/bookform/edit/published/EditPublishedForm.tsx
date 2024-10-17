/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  yearPublished: number;
  setYearPublished: React.Dispatch<React.SetStateAction<number>>;
};

const EditPublishedForm: React.FC<Props> = ({ yearPublished, setYearPublished }) => {

  return (
    <Form.Item
      label="yearPublished"
      name="yearPublished"
      rules={[
        {
          required: true,
          message: "Please write the name of the author!",
        },
      ]}
    >
      <Input
        type="number"
        onChange={(e) => setYearPublished(Number(e.target.value))}
        defaultValue={yearPublished}
        value={yearPublished}
      />
    </Form.Item>
  );
};

export default EditPublishedForm;
