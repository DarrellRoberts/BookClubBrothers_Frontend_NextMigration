"use client"

import { useState } from "react"
import Search from "@/components/misc/search/Search"
import BrothersProfile from "@/components/brothers/library/BrothersProfile"
import BrothersLoadingProfile from "@/components/brothers/library/BrothersLoadingProfile"
import { API_BOOKS, API_USERS, config } from "@/configs/config"
import { User } from "@/types/UserInterface"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { Book } from "@/types/BookInterface"

const Brothercat: React.FC = () => {
  const [searchBar, setSearchBar] = useState("")

  const { data: userData, isLoading: isLoadingUsers } = useGetQuery<User[]>({
    queryKey: ["users"],
    apiPath: API_USERS,
  })

  const { data: bookData, isLoading: isLoadingBooks } = useGetQuery<Book[]>({
    queryKey: ["books"],
    apiPath: API_BOOKS,
  })

  const readBooks = bookData?.filter((book) => book.read === true)

  const filteredResults = Array.isArray(userData)
    ? userData?.filter((user) =>
        user?.username?.toLowerCase().includes(searchBar.toLowerCase()),
      )
    : ["No results"]
  return (
    <>
      <div className="m-6">
        <Search
          setSearchBar={setSearchBar}
          filteredUsers={filteredResults}
          isDisabled={isLoadingUsers}
        />
      </div>
      {isLoadingUsers && isLoadingBooks ? (
        <>
          <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
            Brothers Library
          </h1>
          <div className="flex flex-col items-center">
            <BrothersLoadingProfile />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
            Brothers Library
          </h1>
          <div className="flex flex-col items-center">
            {filteredResults?.length > 0 ? (
              filteredResults?.map((user, index) => (
                <BrothersProfile
                  key={index}
                  user={user}
                  userData={userData}
                  readBooks={readBooks}
                />
              ))
            ) : (
              <div className="h-screen">
                <p>Brother not found. Click search twice to refresh.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Brothercat
