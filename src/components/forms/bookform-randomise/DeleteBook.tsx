/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Popconfirm } from "antd";
import useForm from "@/hooks/post-hooks/useForm";

type Props = {
  id: string;
};

const DeleteBook: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    null,
    "DELETE"
  );

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
        handleSubmit();
      }, 3000);
    });
  return (
    <>
      <Popconfirm
        className="deleteProfile"
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={confirm}
        onOpenChange={() => console.log(id)}
      >
        <Button className="deleteUnreadButton" danger>
          Delete Book
        </Button>
      </Popconfirm>
      {error ? (
        <div className="authorisationMessage">
          <h2>{error}</h2>
        </div>
      ) : null}
    </>
  );
};

export default DeleteBook;
