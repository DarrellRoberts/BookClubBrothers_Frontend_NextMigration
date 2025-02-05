/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  formData: object;
  setYearPublished: React.Dispatch<React.SetStateAction<object>>;
};

const EditPublishedForm: React.FC<Props> = ({ formData, setYearPublished }) => {
  return (
    <Form.Item
      label="yearPublished"
      name="yearPublished"
      rules={
        formData["yearPublished"]
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
        type="number"
        onChange={(e) =>
          setYearPublished({
            ...formData,
            yearPublished: Number(e.target.value),
          })
        }
        defaultValue={formData["yearPublished"]}
        value={formData["yearPublished"]}
      />
    </Form.Item>
  );
};

export default EditPublishedForm;
