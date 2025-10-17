import React from "react"
import LoaderNoText from "@/components/loader/LoaderNoText"
import CreateUnreadBook from "@/components/forms/bookform-randomise/CreateUnreadBook"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setIndex } from "@/store/lib/features/randomise/randomiseSlice"
import { Skeleton } from "antd"

type Props = {
  loadingBooks: boolean
  loadingUsers: boolean
  bookData: Book[]
  userData: User[]
}

const RandomSectionLeft: React.FC<Props> = ({
  loadingBooks,
  loadingUsers,
  bookData,
  userData,
}) => {
  const { decodedToken } = useAuth()
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const findUser = (id) => {
    const user = userData?.find((user) => user._id === id)
    return user ? user.username : "user not found"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="border-[var(--default-border-color)] border-5 border-solid flex flex-col items-center h-[25vh] overflow-y-scroll max-md:h-[20vh] [&::-webkit-scrollbar]:w-[20px] [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb:hover]:bg-gray-600">
        {loadingBooks && loadingUsers ? (
          <Skeleton.Node
            active={true}
            style={{
              width: 200,
              height: 100,
              filter: isDarkMode ? "invert(1)" : "invert(0)",
            }}
            className="flex flex-col items-center mt-1 h-full mx-2"
          >
            <Skeleton.Input className="mt-10" />
            <Skeleton.Input size="small" />
          </Skeleton.Node>
        ) : (
          // </div>
          bookData?.map((book) => (
            <div
              key={book._id}
              className="grid grid-cols-1 grid-rows-1 justify-items-center rounded-2xl bg-[var(--tertiaryColor)] p-4 px-8 mt-4 cursor-pointer max-md:flex max-md:flex-col"
              onClick={() => {
                dispatch(setIndex(bookData.indexOf(book)))
              }}
            >
              <h2 className="font-main text-white text-3xl max-md:text-base max-md:text-center">
                {book?.title}
              </h2>
              <p className="text-white max-md:text-xs max-md:text-center">
                - suggested by{" "}
                {findUser(book?.suggestedBy) === "user not found"
                  ? " (...loading)"
                  : findUser(book?.suggestedBy)}
              </p>
            </div>
          ))
        )}
        {decodedToken ? <CreateUnreadBook /> : null}
      </div>

      <div className="flex flex-col justify-evenly items-center h-1/2 mt-5 max-md:hidden">
        <h2 className="text-[var(--main-font-color)] mt-5 text-center font-main text-xl max-md:text-base">
          Scroll the list above for suggested books or add your own at the end
        </h2>
        <h2 className="text-[var(--main-font-color)] mt-5 text-center font-main text-xl max-md:text-base">
          Click randomise on the right to randomise the selection or click on
          each item in the list to see its details.
        </h2>
        {!loadingBooks && !loadingUsers ? (
          <h2 className="text-red-500 font-main text-xl text-center bg-black mt-5 mr-1 rounded max-md:text-base">
            Only the admin can select the book.
          </h2>
        ) : null}
      </div>
    </div>
  )
}

export default RandomSectionLeft
