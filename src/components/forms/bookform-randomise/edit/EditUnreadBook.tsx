/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Modal, Button } from "antd";
import EditForm from "./EditForm";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setShowEdit } from "@/store/lib/features/auth/editButtonsSlice";

type Props = {
  id: string;
  inAuthor: string;
  inTitle: string;
  inPublished: number;
  inPages: number;
  inGenre: string[];
  inImageURL: string;
};

const EditUnreadBook: React.FC<Props> = ({
  id,
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImageURL,
}) => {
  const showEditBook = useAppSelector((state) => state.editButtons.showEdit);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(setShowEdit());
  };
  const handleCancel = () => {
    dispatch(setShowEdit());
  };
  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal} size="large">
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
          key={id}
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
  )
};

export default EditUnreadBook;
