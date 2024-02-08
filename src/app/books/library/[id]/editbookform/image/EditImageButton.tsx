import { Button } from "antd"

interface props {
    setImageEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showImageEdit: boolean
}

const EditImageButton: React.FC<props> = ({setImageEdit, showImageEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showImageEdit ? (
    <Button
        className="m-5"
        onClick={() => setImageEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="ml-5 mb-5"
        onClick={() => setImageEdit(true)}
      >
        Change image 
      </Button>
      )}
      </div>
    </>
)
}

export default EditImageButton