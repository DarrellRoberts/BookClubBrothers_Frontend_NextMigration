/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Form, Input } from "antd";

type Props = {
  formData: object;
  setPages: React.Dispatch<React.SetStateAction<object>>;
};

const EditPagesForm: React.FC<Props> = ({ formData, setPages }) => {
  return (
    <Form.Item
      label="Pages"
      name="pages"
      rules={
        formData["pages"]
          ? null
          : [
              {
                required: true,
                message: "Please write the number of pages!",
              },
            ]
      }
    >
      <Input
        type="number"
        onChange={(e) =>
          setPages({ ...formData, pages: Number(e.target.value) })
        }
        defaultValue={formData["pages"]}
        value={formData["pages"]}
      />
    </Form.Item>
  );
};

export default EditPagesForm;
