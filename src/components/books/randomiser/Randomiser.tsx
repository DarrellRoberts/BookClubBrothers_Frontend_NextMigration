import { Button } from "antd"
import SelectBook from "../../forms/bookform-randomise/SelectBook"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import {
  setIndex,
  setShowRandom,
} from "@/store/lib/features/randomise/randomiseSlice"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { useCallback } from "react"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  bookLength: number
  bookId: string
}

const Randomiser: React.FC<Props> = ({ bookLength, bookId }) => {
  const dispatch = useAppDispatch()
  const showRandom = useAppSelector((state) => state.randomise.showRandom)
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const { decodedToken } = useAuth()

  const handleRandomise = useCallback(() => {
    dispatch(setShowRandom())
    const timerId = setInterval(() => {
      dispatch(setIndex(Math.floor(Math.random() * bookLength)))
    }, 50)
    setTimeout(() => {
      clearInterval(timerId)
      dispatch(setShowRandom())
    }, 3000)
  }, [showRandom])

  return (
    <div className="flex justify-evenly items-center max-md:flex-col">
      {showRandom ? (
        <>
          <UiButton
            clickHandler={handleRandomise}
            type="primary"
            textContent="Randomise"
          />
          {adminId === decodedToken?._id ? (
            <SelectBook bookId={bookId} />
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export default Randomiser
