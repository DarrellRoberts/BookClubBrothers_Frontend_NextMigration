import { AuthContext } from "@/context/AuthContext";
import { Button, Form } from "antd";
import React, { useContext, useState } from "react";
import EditAuthorForm from "./author/EditAuthorForm";
import EditTitleForm from "./title/EditTitleForm";
import EditPublishedForm from "./published/EditPublishedForm";
import EditPagesForm from "./pages/EditPagesForm";
import EditGenreForm from "./genre/EditGenreForm";
import EditImageURLForm from "./imageURL/EditImageURLForm";

type Props = {
  inAuthor: string;
  inTitle: string;
  inPublished: number;
  inPages: number;
  inImageURL: string;
  inGenre: string[];
  id: string;
};

const EditForm: React.FC<Props> = ({ inAuthor, inTitle, inPublished, inPages, inGenre, inImageURL, id }) => {
  const [author, setAuthor] = useState<string>(inAuthor);
  const [title, setTitle] = useState<string>(inTitle);
  const [yearPublished, setYearPublished] = useState<number>(inPublished);
  const [pages, setPages] = useState<number>(inPages);
  const [genre, setGenre] = useState<string[]>(inGenre);
  const [imageURL, setImageURL] = useState<string>(inImageURL);
  const [error, setError] = useState<string>();
  const [loadings, setLoadings] = useState<boolean>(false);
  const { token } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      setError(null);
      const response = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            author,
            yearPublished,
            pages,
            genre,
            imageURL
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log("something has happened");
      }
      if (response.ok) {
        console.log("SUCCESS!!!");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      document.location.reload();
    }, 2000);
  };
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
      <EditTitleForm title={title} setTitle={setTitle} />
      <EditAuthorForm author={author} setAuthor={setAuthor} />
      <EditPublishedForm yearPublished={yearPublished} setYearPublished={setYearPublished} />
      <EditPagesForm pages={pages} setPages={setPages} />
      <EditGenreForm genre={genre} setGenre={setGenre} />
      <EditImageURLForm imageURL={imageURL} setImageURL={setImageURL}/>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button
          className="loginButtons"
          loading={loadings}
          onClick={() => handleLoading()}
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
