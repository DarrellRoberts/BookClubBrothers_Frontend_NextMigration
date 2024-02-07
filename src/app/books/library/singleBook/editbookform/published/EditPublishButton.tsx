import { Button } from "antd"

interface props {
    setPublishEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showPublishEdit: boolean
}

const EditPublishButton: React.FC<props> = ({setPublishEdit, showPublishEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showPublishEdit ? (
    <Button
        className="mb-5"
        onClick={() => setPublishEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => setPublishEdit(true)}
      >
        Edit Year
      </Button>
      )}
      </div>
    </>
)
}

export default EditPublishButton