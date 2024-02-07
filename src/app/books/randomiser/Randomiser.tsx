import {useState} from "react"
import { Button } from "antd"
import SelectBook from "./bookform/SelectBook"

interface props {
    setIndex: React.Dispatch<React.SetStateAction<number>>
    bookLength: number,
    bookId: string
}

const Randomiser: React.FC<props> = ({setIndex, bookLength, bookId}) => {
const [showRandom, setShowRandom] = useState(true)

const handleRandomise = () => {
    setShowRandom(false)
    const Int = setInterval(() => {
        setIndex(Math.floor(Math.random() * bookLength));
      }, 50);
      setTimeout(() => {
        clearInterval(Int);
        setShowRandom(true)
      }, 3000);
    }

    return (
        <>
        <div className="randomiseCon">
        {showRandom ? (
        <>
        <Button
        onClick={handleRandomise}
        >
        Randomise
        </Button>
        <SelectBook bookId={bookId}/>
        </>
        ) : null}
        </div>
        </>
    )
}

export default Randomiser