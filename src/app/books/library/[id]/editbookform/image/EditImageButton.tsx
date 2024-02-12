import { Button } from "antd"

type ActionType = {
  type: string
}

interface props {
  dispatch: React.Dispatch<ActionType>,
  showImage: boolean
}

const EditImageButton: React.FC<props> = ({dispatch, showImage}) => {
return(
    <>
    <div className="flex items-center">
        {showImage ? (
    <Button
        className="m-5"
        onClick={() => dispatch({type: "toggleShowImage"})}
      >
        X
      </Button>
      ) : (
      <Button
        className="ml-5 mb-5"
        onClick={() => dispatch({type: "toggleShowImage"})}
      >
        Change image 
      </Button>
      )}
      </div>
    </>
)
}

export default EditImageButton