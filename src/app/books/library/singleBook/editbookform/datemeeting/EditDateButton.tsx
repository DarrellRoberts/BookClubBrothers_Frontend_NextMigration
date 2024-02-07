import { Button } from "antd"

interface props {
    setDateEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showDateEdit: boolean
}

const EditDateButton: React.FC<props> = ({setDateEdit, showDateEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showDateEdit ? (
    <Button
        className="mb-5"
        onClick={() => setDateEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => setDateEdit(true)}
      >
        Edit Date
      </Button>
      )}
      </div>
    </>
)
}

export default EditDateButton