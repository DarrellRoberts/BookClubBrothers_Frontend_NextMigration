import { Button } from "antd"

interface props {
    setAuthorEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showAuthorEdit: boolean
}

const EditAuthorButton: React.FC<props> = ({setAuthorEdit, showAuthorEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showAuthorEdit ? (
    <Button
        className="mb-5"
        onClick={() => setAuthorEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => setAuthorEdit(true)}
      >
        Edit Author
      </Button>
      )}
      </div>
    </>
)
}

export default EditAuthorButton