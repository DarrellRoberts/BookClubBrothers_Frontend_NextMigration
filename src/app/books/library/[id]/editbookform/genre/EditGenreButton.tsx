import { Button } from "antd"

type ActionType = {
  type: string
}

interface props {
  dispatch: React.Dispatch<ActionType>,
  showGenre: boolean
}

const EditGenreButton: React.FC<props> = ({dispatch, showGenre}) => {
return(
    <>
    <div className="flex items-center">
        {showGenre ? (
    <Button
        className="mb-5"
        onClick={() => dispatch({ type: 'toggleShowGenre'})}
      >
        X
      </Button>
      ) : (
      <Button
        className="mb-5"
        onClick={() => dispatch({ type: 'toggleShowGenre'})}
      >
        Edit Genre
      </Button>
      )}
      </div>
    </>
)
}

export default EditGenreButton