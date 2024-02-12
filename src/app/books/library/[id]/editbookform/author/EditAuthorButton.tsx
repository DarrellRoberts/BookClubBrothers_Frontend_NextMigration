import { Button } from "antd"

type ActionType = {
  type: string
}

interface props {
  dispatch: React.Dispatch<ActionType>,
  showAuthor: boolean
}

const EditAuthorButton: React.FC<props> = ({dispatch, showAuthor}) => {
return(
    <>
    <div className="flex items-center">
        {showAuthor ? (
    <Button
        className="mb-5"
        onClick={() => dispatch({type: "toggleShowAuthor"})}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => dispatch({type: "toggleShowAuthor"})}
      >
        Edit Author
      </Button>
      )}
      </div>
    </>
)
}

export default EditAuthorButton