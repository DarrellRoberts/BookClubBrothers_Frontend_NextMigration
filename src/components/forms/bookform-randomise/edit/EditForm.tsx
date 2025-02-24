import { Button, Form } from "antd";
import React from "react";
import EditAuthorForm from "./author/EditAuthorForm";
import EditTitleForm from "./title/EditTitleForm";
import EditPublishedForm from "./published/EditPublishedForm";
import EditPagesForm from "./pages/EditPagesForm";
import EditGenreForm from "./genre/EditGenreForm";
import EditImageURLForm from "./imageURL/EditImageURLForm";
import useForm from "@/hooks/crud-hooks/useForm";

type Props = {
  inAuthor: string;
  inTitle: string;
  inPublished: number;
  inPages: number;
  inImageURL: string;
  inGenre: string[];
  id: string;
};

const EditForm: React.FC<Props> = ({
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImageURL,
  id,
}) => {
  const { handleSubmit, error, loadings, enterLoading } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT"
  );

  return (
    <Form
      onFinish={handleSubmit}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre,
        imageURL: inImageURL,
      }}
    >
      <EditTitleForm />
      <EditAuthorForm />
      <EditPublishedForm />
      <EditPagesForm />
      <EditGenreForm />
      <EditImageURLForm />
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="loginButtons"
          loading={loadings}
          onClick={() => enterLoading()}
          htmlType="submit"
        >
          Submit
        </Button>
        {error ? <h4 className="errorH">{error}</h4> : null}
      </Form.Item>
    </Form>
  );
};

export default EditForm;
