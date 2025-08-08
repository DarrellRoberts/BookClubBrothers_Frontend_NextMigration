/* eslint-disable react/react-in-jsx-scope */
"use client"
import PieChart from "@/components/graphs/brothers/PieChart"
import BrotherTable from "@/components/stats/brother-table/BrotherTable"
import {
  unreadBookTitles,
  userReadBookTitles,
} from "@/utils/stat-functions/scoreFunctions"
import LoaderNoText from "@/components/loader/LoaderNoText"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import BrothersScores from "@/components/brothers/stats/BrothersScores"
import BrothersSuggestedBooks from "@/components/brothers/stats/BrothersSuggestedBooks"
import React from "react"

const BrothersStats: React.FC = () => {
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  )

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )

  const readBooks = bookData?.filter((book) => book.read === true)
  return (
    <div className={loadingUsers && loadingBooks ? "h-screen" : ""}>
      <h1
        className="font-['var(--main)'] text-[5rem] ml-12
max-[825px]:text-[3.5rem] max-[450px]:text-[2.5rem]"
      >
        Brothers Stats
      </h1>

      <div className="flex flex-col items-center">
        <BrotherTable userData={userData} bookData={readBooks} />     {" "}
      </div>

      <div
        className="flex flex-col justify-evenly ml-12 max-[450px]:ml-0
 "
      >
        <h2
          className="font-['var(--main)'] text-[2.5rem] underline my-8 ml-12
max-[450px]:text-center max-[450px]:ml-0 max-[450px]:my-8"
        >
          Books Read
        </h2>
        {!readBooks ? (
          <LoaderNoText />
        ) : (
          <div
            className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8
max-[600px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]"
          >
            {userData?.map((user, i) => (
              <div key={i}>
                <h3 className="text-center font-['var(--main)'] text-[1.5rem]">
                  {user.username}
                </h3>
                <PieChart
                  key={i}
                  booksRead={[
                    user.userInfo.books.score.length,
                    unreadBookTitles(readBooks, user._id)?.length,
                  ]}
                  unreadBooks={unreadBookTitles(readBooks, user._id)}
                  userReadBooks={userReadBookTitles(readBooks, user._id)}
                  bookTotal={readBooks?.length}
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <h2
            className="font-['var(--main)'] text-[2.5rem] underline my-8 ml-12
 max-[450px]:text-center max-[450px]:ml-0 max-[450px]:my-8"
          >
            Average Scores
          </h2>
          <BrothersScores
            loadingBooks={loadingBooks}
            loadingUsers={loadingUsers}
            userData={userData}
          />
        </div>
        <div>
          <h2
            className="font-['var(--main)'] text-[2.5rem] underline my-8 ml-12
max-[450px]:text-center max-[450px]:ml-0 max-[450px]:my-8"
          >
            Number of Suggested Books
          </h2>
          <BrothersSuggestedBooks bookData={readBooks} userData={userData} />   
        </div>
      </div>
    </div>
  )
}

export default BrothersStats
