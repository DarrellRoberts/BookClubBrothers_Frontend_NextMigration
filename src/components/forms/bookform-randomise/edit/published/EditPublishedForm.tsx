/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { setFormData } from "@/store/lib/features/randomise/randomiseEditSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Form, Input } from "antd";

const EditPublishedForm = () => {
  const formData = useAppSelector((state) => state.randomiseEdit.formData);
  const yearPublished = useAppSelector(
    (state) => state.randomiseEdit.formData.yearPublished
  );
  const dispatch = useAppDispatch();
  return (
    <Form.Item
      label="Published"
      name="yearPublished"
      rules={
        yearPublished
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
          dispatch(
            setFormData({
              ...formData,
              yearPublished: Number(e.target.value),
            })
          )
        }
        defaultValue={yearPublished}
        value={yearPublished}
      />
    </Form.Item>
  );
};

export default EditPublishedForm;
