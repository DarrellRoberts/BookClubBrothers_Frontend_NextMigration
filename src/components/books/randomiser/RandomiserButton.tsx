import SelectBook from "../../forms/bookform-randomise/SelectBook"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import {
  setIndex,
  setShowRandom,
} from "@/store/lib/features/randomise/randomiseSlice"
import { useCallback } from "react"
import { UiButton } from "@/components/ui/button/UiButton"
import { useDecodedJwt } from "@/hooks/auth-hooks/useDecodedJwt"

type Props = {
  bookLength: number
  bookId: string
}

const RandomiserButton: React.FC<Props> = ({ bookLength, bookId }) => {
  const dispatch = useAppDispatch()
  const showRandom = useAppSelector((state) => state.randomise.showRandom)
  const { userId } = useDecodedJwt()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID

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
          {adminId === userId ? <SelectBook bookId={bookId} /> : null}
        </>
      ) : null}
    </div>
  )
}

export default RandomiserButton
