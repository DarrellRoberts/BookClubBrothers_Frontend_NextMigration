/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { type Dispatch } from "react";
import { Modal, Button } from "antd";
import { ACTIONS } from "../../../books/randomiser/actions";
import EditForm from "./EditForm";

type Props = {
  id: string;
  showEditBook: boolean;
  dispatch: Dispatch<unknown>;
  inAuthor: string;
  inTitle: string;
  inPublished: number;
  inPages: number;
  inGenre: string[];
  inImageURL: string;
};

const EditUnreadBook: React.FC<Props> = ({
  id,
  showEditBook,
  dispatch,
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImageURL,
}) => {
  // const [modalText, setModalText] = useState();

  const showModal = () => {
    dispatch({ type: ACTIONS.SHOWEDITBOOK, payload: true });
  };
  const handleCancel = () => {
    dispatch({ type: ACTIONS.SHOWEDITBOOK, payload: false });
  };
  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal}>
          Edit book
        </Button>
      </div>
      <Modal
        title="Edit book"
        open={showEditBook}
        onCancel={handleCancel}
        footer={null}
      >
        <EditForm
          id={id}
          inAuthor={inAuthor}
          inTitle={inTitle}
          inPublished={inPublished}
          inPages={inPages}
          inGenre={inGenre}
          inImageURL={inImageURL}
        />
      </Modal>
    </>
  );
};

export default EditUnreadBook;
