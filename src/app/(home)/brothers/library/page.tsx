"use client"

import { useState } from "react"
import Search from "@/components/misc/search/Search"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import BrothersProfile from "@/components/brothers/library/BrothersProfile"
import BrothersLoadingProfile from "@/components/brothers/library/BrothersLoadingProfile"

const Brothercat: React.FC = () => {
  const [searchBar, setSearchBar] = useState("")

  const { userData, loadingUsers } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  )

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )

  const readBooks = bookData?.filter((book) => book.read === true)

  const filteredResults = Array.isArray(userData)
    ? userData?.filter((user) =>
        user?.username?.toLowerCase().includes(searchBar.toLowerCase())
      )
    : ["No results"]
  return (
    <>
      <div className="m-6">
        <Search
          setSearchBar={setSearchBar}
          filteredUsers={filteredResults}
          isDisabled={loadingUsers}
        />
      </div>
      {loadingUsers && loadingBooks ? (
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
