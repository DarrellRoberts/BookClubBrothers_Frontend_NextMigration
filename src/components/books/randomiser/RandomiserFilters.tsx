import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import React, { useEffect, useMemo, useState } from "react"
import { useAppDispatch } from "@/store/lib/hooks"
import { setIndex } from "@/store/lib/features/randomise/randomiseSlice"
import { genres } from "@/configs/genre"
import { Select } from "antd"
import { InputConfigWrapper } from "@/components/forms/InputConfigWrapper"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"

type Props = {
  bookData: Book[]
  userData: User[]
  setBookData: React.Dispatch<React.SetStateAction<Book[]>>
}

const RandomiserFilters: React.FC<Props> = ({
  bookData,
  userData,
  setBookData,
}) => {
  const [nameFilter, setNameFilter] = useState([])
  const [genreFilter, setGenreFilter] = useState([])

  const dispatch = useAppDispatch()

  const usernameArray = useMemo(() => {
    if (!userData?.length) return []
    return userData.map((user) => ({
      value: user._id,
      label: user.username,
    }))
  }, [userData])

  const handleGenreSelect = (values) => {
    setGenreFilter(values)
  }

  const handleUsernameSelect = (values) => {
    setNameFilter(values)
  }

  useEffect(() => {
    if (!bookData?.length) return

    let filteredResults = [...bookData]

    if (nameFilter.length > 0) {
      filteredResults = filteredResults.filter((book) =>
        nameFilter.includes(book.suggestedBy),
      )
    }

    if (genreFilter.length > 0) {
      filteredResults = filteredResults.filter((book) =>
        genreFilter.every((selected) => book.genre.includes(selected)),
      )
    }
    setBookData(filteredResults)
    dispatch(setIndex(0))
  }, [nameFilter, genreFilter, bookData, dispatch, setBookData])

  return !userData ? (
    <div className="my-12 flex items-center max-lg:flex-col w-full max-lg:gap-5">
      <div className="flex flex-col w-full items-center">
        <h2 className="text-center">Filter by suggestor</h2>
        <UiSkeletonTitle height={2} width={50} />
      </div>
      <div className="flex flex-col w-full items-center">
        <h2 className="text-center">Filter by genre</h2>
        <UiSkeletonTitle height={2} width={50} />
      </div>
    </div>
  ) : (
    <div className="my-12 flex items-center max-lg:flex-col w-full max-lg:gap-5">
      <div className="flex flex-col w-full items-center">
        <h2 className="text-center">Filter by Username</h2>
        <div className="flex w-full justify-evenly flex-wrap gap-8"></div>
        <InputConfigWrapper>
          <Select
            mode="tags"
            className="w-3/4"
            placeholder="Select username(s)"
            onChange={handleUsernameSelect}
            value={nameFilter}
            options={usernameArray}
          />
        </InputConfigWrapper>
      </div>
      <div className=" flex flex-col w-full">
        <h2 className="text-center">Filter by genre</h2>
        <div className="flex w-full justify-evenly flex-wrap gap-8">
          <InputConfigWrapper>
            <Select
              mode="tags"
              className="w-3/4"
              placeholder="Select genre(s)"
              onChange={handleGenreSelect}
              value={genreFilter}
              options={genres}
            />
          </InputConfigWrapper>
        </div>
      </div>
    </div>
  )
}

export default RandomiserFilters
