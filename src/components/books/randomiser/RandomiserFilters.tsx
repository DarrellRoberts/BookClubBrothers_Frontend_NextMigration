import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import React, { useEffect, useState } from "react"
import "./filters.css"

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
    } else if (nameFilter.length === 0 && genreFilter.length > 0) {
      const tempArray = bookData?.filter((book) =>
        book.genre[0].some((genre) => genre.includes(genreFilter))
      )
      setBookData(tempArray)
    } else if (nameFilter.length > 0 && genreFilter.length === 0) {
      const tempArray = bookData?.filter((book) =>
        nameFilter?.includes(book.suggestedBy)
      )
      setBookData(tempArray)
    } else if (nameFilter.length > 0 && genreFilter.length > 0) {
      let tempArray = bookData?.filter((book) =>
        nameFilter?.includes(book.suggestedBy)
      )
      tempArray = tempArray?.filter((book) =>
        book.genre[0].some((genre) => genre.includes(genreFilter))
      )
      setBookData(tempArray)
    }
  }, [nameFilter, genreFilter])
  return (
    <div className="flex flex-col">
      <div>
        <h2 className="text-center">Filter by suggestor</h2>
        <div className="flex w-full justify-evenly">
          {userData?.map((user) => (
            <div key={user._id}>
              <input
              className="filter-checkbox"
                type="checkbox"
                name={user.username}
                value={user._id}
                onChange={() => handleNameCheckbox(user._id)}
              />
              <label htmlFor={user.username} className="filter-label">{user.username}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[3rem] mb-[3rem]">
        <h2 className="text-center">Filter by genre</h2>
        <div className="genre-filter-grid">
          {genreList?.map((genre, index) => (
            <div key={index}>
              <input
                type="checkbox"
                className="filter-checkbox"
                name={genre}
                value={genre}
                onChange={() => handleGenreCheckbox(genre)}
              />
              <label htmlFor={genre} className="filter-label">{genre}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RandomiserFilters
