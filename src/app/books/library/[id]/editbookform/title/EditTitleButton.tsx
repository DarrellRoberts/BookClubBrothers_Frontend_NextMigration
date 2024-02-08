import { Button } from "antd"

interface props {
    setTitleEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showTitleEdit: boolean
}

const EditTitleButton: React.FC<props> = ({setTitleEdit, showTitleEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showTitleEdit ? (
    <Button
        className="ml-5"
        onClick={() => setTitleEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="ml-5"
        onClick={() => setTitleEdit(true)}
      >
        Edit Title
      </Button>
      )}
      </div>
    </>
)
}

export default EditTitleButton