import { Button } from "antd"

interface props {
    setGenreEdit: React.Dispatch<React.SetStateAction<boolean>>,
    showGenreEdit: boolean
}

const EditGenreButton: React.FC<props> = ({setGenreEdit, showGenreEdit}) => {
return(
    <>
    <div className="flex items-center">
        {showGenreEdit ? (
    <Button
        className="mb-5"
        onClick={() => setGenreEdit(false)}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => setGenreEdit(true)}
      >
        Edit Genre
      </Button>
      )}
      </div>
    </>
)
}

export default EditGenreButton