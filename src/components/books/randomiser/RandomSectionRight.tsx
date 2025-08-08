import React from "react"
import LoaderNoText from "@/components/loader/LoaderNoText"
import Randomiser from "./Randomiser"
import EditUnreadBook from "@/components/forms/bookform-randomise/edit/EditUnreadBook"
import DeleteBook from "@/components/forms/bookform-delete/DeleteBook"
import { Book } from "@/types/BookInterface"
import { useAppSelector } from "@/store/lib/hooks"
import { User } from "@/types/UserInterface"
import { useAuth } from "@/hooks/auth-hooks/useAuth"

type Props = {
  bookData: Book[]
  error: Error
  userData: User[]
}

const RandomSectionRight: React.FC<Props> = ({ bookData, error, userData }) => {
  const index = useAppSelector((state) => state.randomise.index)
  const showRandom = useAppSelector((state) => state.randomise.showRandom)
  const { decodedToken } = useAuth()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID

  const findUser = (id) => {
    const user = userData?.find((user) => user._id === id)
    return user ? user.username : "user not found"
  }

  return (
    <div
      className="grid grid-rows-2 border-[var(--default-border-color)] border-5 border-solid p-2 max-md:flex max-md:flex-col max-md:p-0 max-md:border-0"
      style={{
        backgroundImage: bookData
          ? `URL(${bookData[index]?.imageURL})`
          : "black",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!bookData ? (
        <div className="flex justify-center items-center mt-20">
          <LoaderNoText />
        </div>
      ) : (
        <div className="bg-[var(--main-bg-color)] font-main flex flex-col justify-center items-center border-[var(--default-border-color)] border-5 border-solid h-[400px] max-md:justify-start max-md:h-[300px] max-md:m-8">
          {error ? (
            <h2 className="text-red-500 bg-black">{error.message}</h2>
          ) : !bookData[index] ? (
            <h2>No results found</h2>
          ) : (
            <>
              <h2 className="text-5xl underline text-center max-md:text-2xl max-md:text-center">
                {bookData[index]?.title}
              </h2>
              <ul className="text-center">
                <li className="text-2xl max-md:text-xl">
                  Author: {bookData[index]?.author}
                </li>
                <li className="text-2xl max-md:text-xl">
                  Published: {bookData[index]?.yearPublished}
                </li>
                <li className="text-2xl max-md:text-xl">
                  Pages: {bookData[index]?.pages}
                </li>
                <li className="text-2xl max-md:text-xl">
                  Genre: {bookData[index]?.genre.map((theme) => ` ${theme} `)}
                </li>
                <li className="text-2xl max-md:text-xl">
                  Suggested by:{" "}
                  {findUser(bookData[index]?.suggestedBy) === "user not found"
                    ? " (loading...)"
                    : findUser(bookData[index]?.suggestedBy)}{" "}
                </li>
              </ul>
              <div className="flex items-center justify-center w-full max-md:flex-col">
                <Randomiser
                  bookLength={bookData?.length}
                  bookId={bookData[index]?._id}
                />
                {(showRandom &&
                  bookData[index]?.suggestedBy === decodedToken?._id) ||
                decodedToken?._id === adminId ? (
                  <>
                    <EditUnreadBook
                      id={bookData[index]?._id}
                      inAuthor={bookData[index]?.author}
                      inTitle={bookData[index]?.title}
                      inPublished={bookData[index]?.yearPublished}
                      inPages={bookData[index]?.pages}
                      inGenre={bookData[index]?.genre}
                      inImageURL={bookData[index]?.imageURL}
                    />
                    <DeleteBook id={bookData[index]?._id} />
                  </>
                ) : null}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default RandomSectionRight
