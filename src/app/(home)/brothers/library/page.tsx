/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import Loader from "@/components/loader/Loader";
import Search from "@/components/misc/search/Search";
import "@/style/brothercat.css";
import "@/style/brothercatRes.css";
import "@/style/search.css";
import "@/style/searchRes.css";
import "@/style/button.css";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import BrothersProfile from "@/components/brothers/library/BrothersProfile";

const Brothercat: React.FC = () => {
  const [searchBar, setSearchBar] = useState("");

  const { userData, loadingUsers } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  );

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  const filteredResults = Array.isArray(userData)
    ? userData?.filter((user) => user?.username?.includes(searchBar))
    : ["No results"];
  return (
    <>
      <div className="searchBackCon">
        <Search setSearchBar={setSearchBar} />
      </div>
      {loadingUsers && loadingBooks ? (
        <Loader />
      ) : (
        <>
          <h1 className="brothersTitle">Brothers Library</h1>
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
  );
};

export default Brothercat;
