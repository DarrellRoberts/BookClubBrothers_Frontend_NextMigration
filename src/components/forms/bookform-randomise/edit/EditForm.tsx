import { Button, Form } from "antd";
import React, { useEffect } from "react";
import EditAuthorForm from "./author/EditAuthorForm";
import EditTitleForm from "./title/EditTitleForm";
import EditPublishedForm from "./published/EditPublishedForm";
import EditPagesForm from "./pages/EditPagesForm";
import EditGenreForm from "./genre/EditGenreForm";
import EditImageURLForm from "./imageURL/EditImageURLForm";
import useForm from "@/hooks/crud-hooks/useForm";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setFormData } from "@/store/lib/features/randomise/randomiseEditSlice";

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
  const formData = useAppSelector((state) => state.randomiseEdit.formData);
  const dispatch = useAppDispatch();

  const { handleSubmit, error, loadings, enterLoading } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "PUT"
  );

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre,
        imageURL: inImageURL,
      })
    );
  }, [id]);
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
        remember: true,
      }}
    >
      <EditTitleForm inTitle={inTitle} />
      <EditAuthorForm inAuthor={inAuthor} />
      <EditPublishedForm inPublished={inPublished} />
      <EditPagesForm inPages={inPages} />
      <EditGenreForm inGenre={inGenre} />
      <EditImageURLForm inImageURL={inImageURL} />
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
