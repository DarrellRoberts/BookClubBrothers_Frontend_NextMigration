import { Button } from "antd"

interface props {
    setPageEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showPageEdit: boolean
}

const EditPagesButton: React.FC<props> = ({setPageEdit, showPageEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showPageEdit ? (
    <Button
        className="mb-5"
        onClick={() => setPageEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => setPageEdit(true)}
      >
        Edit Pages
      </Button>
      )}
      </div>
    </>
)
}

export default EditPagesButton