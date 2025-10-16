import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setIndex } from "@/store/lib/features/randomise/randomiseSlice"
import RandomiserSkeletonFilters from "./RandomiserSkeletonFilters"

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

  const genreList = [
    "Horror",
    "Thriller",
    "Comedy",
    "Romance",
    "Fantasy",
    "Adventure",
    "Anti-war",
    "Drama",
    "Action",
    "Science-fiction",
    "Dystopian",
    "Postmodern",
    "Anthology",
    "Non-fiction",
  ]

  const handleNameCheckbox = (value) => {
    if (nameFilter.includes(value)) {
      const tempArr = [...nameFilter]
      setNameFilter(tempArr.filter((item) => item !== value))
    } else {
      const tempArr = [...nameFilter]
      setNameFilter([...tempArr, value])
    }
  }

  const handleGenreCheckbox = (value) => {
    if (genreFilter.includes(value)) {
      const tempArr = [...genreFilter]
      setGenreFilter(tempArr.filter((item) => item !== value))
    } else {
      const tempArr = [...genreFilter]
      setGenreFilter([...tempArr, value])
    }
  }

  useEffect(() => {
    if (nameFilter.length === 0 && genreFilter.length === 0) {
      setBookData(bookData)
      dispatch(setIndex(0))
    } else if (nameFilter.length === 0 && genreFilter.length > 0) {
      const tempArray = bookData?.filter((book) =>
        book.genre[0].some((genre) => genre.includes(genreFilter))
      )
      setBookData(tempArray)
      dispatch(setIndex(0))
    } else if (nameFilter.length > 0 && genreFilter.length === 0) {
      const tempArray = bookData?.filter((book) =>
        nameFilter?.includes(book.suggestedBy)
      )
      setBookData(tempArray)
      dispatch(setIndex(0))
    } else if (nameFilter.length > 0 && genreFilter.length > 0) {
      let tempArray = bookData?.filter((book) =>
        nameFilter?.includes(book.suggestedBy)
      )
      tempArray = tempArray?.filter((book) =>
        genreFilter.every((selectedGenre) =>
          book.genre[0].includes(selectedGenre)
        )
      )
      setBookData(tempArray)
      dispatch(setIndex(0))
    }
  }, [nameFilter, genreFilter])
  return (
    <div className="flex flex-col w-full">
      <div>
        <h2 className="text-center">Filter by suggestor</h2>
        <div className="flex w-full justify-evenly flex-wrap gap-4">
          {!userData ? (
            <div className="flex flex-col w-full">
              <div className="flex w-full justify-evenly flex-wrap gap-4">
                <RandomiserSkeletonFilters freq={6} />
              </div>
              <div className="my-4">
                <h2 className="text-center">Filter by genre</h2>
                <div className="flex w-full justify-evenly flex-wrap gap-4">
                  <RandomiserSkeletonFilters freq={genreList.length} />
                </div>
              </div>
            </div>
          ) : (
            <>
              {userData?.map((user) => (
                <div key={user._id}>
                  <input
                    className="accent-bc-green"
                    type="checkbox"
                    checked={nameFilter.includes(user._id)}
                    name={user.username}
                    value={user._id}
                    onChange={() => handleNameCheckbox(user._id)}
                  />
                  <label htmlFor={user.username} className="font-main ml-1">
                    {user.username}
                  </label>
                </div>
              ))}
              <div>
                <input
                  type="checkbox"
                  className="accent-bc-green"
                  name="Clear all"
                  checked={nameFilter.length === 0}
                  onChange={() => setNameFilter([])}
                />
                <label htmlFor="Clear all" className="font-main ml-1">
                  Clear all
                </label>
              </div>
              <div className="my-12 flex flex-col w-full">
                <h2 className="text-center">Filter by genre</h2>
                <div className="flex w-full justify-evenly flex-wrap gap-8">
                  {genreList?.map((genre, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        className="accent-bc-green"
                        checked={genreFilter.includes(genre)}
                        name={genre}
                        value={genre}
                        onChange={() => handleGenreCheckbox(genre)}
                      />
                      <label htmlFor={genre} className="font-main ml-1">
                        {genre}
                      </label>
                    </div>
                  ))}
                  <div>
                    <input
                      type="checkbox"
                      className="accent-bc-green"
                      name="Clear all"
                      checked={genreFilter.length === 0}
                      onChange={() => setGenreFilter([])}
                    />
                    <label htmlFor="Clear all" className="font-main ml-1">
                      Clear all
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RandomiserFilters
