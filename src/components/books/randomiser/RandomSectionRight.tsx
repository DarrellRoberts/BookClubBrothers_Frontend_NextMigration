import React from "react";
import style from "./randomiser.module.css";
import LoaderNoText from "@/components/loader/LoaderNoText";
import Randomiser from "./Randomiser";
import EditUnreadBook from "@/components/forms/bookform-randomise/edit/EditUnreadBook";
import DeleteBook from "@/components/forms/bookform-delete/DeleteBook";
import { Book } from "@/types/BookInterface";
import { useAppSelector } from "@/store/lib/hooks";
import { User } from "@/types/UserInterface";
import { useAuth } from "@/hooks/auth-hooks/useAuth";

type Props = {
  bookData: Book[];
  loadingBooks: boolean;
  error: Error;
  userData: User[];
};

const RandomSectionRight: React.FC<Props> = ({
  bookData,
  loadingBooks,
  error,
  userData,
}) => {
  const index = useAppSelector((state) => state.randomise.index);
  const showRandom = useAppSelector((state) => state.randomise.showRandom);
  const { decodedToken } = useAuth();
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;

  const findUser = (id) => {
    const user = userData?.find((user) => user._id === id);
    return user ? user.username : "user not found";
  };

  return (
    <div
      className={style.randomBoxRight}
      style={{
        backgroundImage: bookData
          ? `URL(${bookData[index]?.imageURL})`
          : "black",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {loadingBooks ? (
        <div className="flex justify-center items-center mt-20">
          <LoaderNoText />
        </div>
      ) : (
        <div className={style.randomDetailsCon + " bg-white"}>
          {error ? (
            <h2 className="text-red-500 bg-black">{error.message}</h2>
          ) : (
            <>
              <h2>{bookData[index]?.title}</h2>
              <ul className="text-center">
                <li>Author: {bookData[index]?.author}</li>
                <li>Published: {bookData[index]?.yearPublished}</li>
                <li>Pages: {bookData[index]?.pages}</li>
                <li>
                  Genre: {bookData[index]?.genre.map((theme) => ` ${theme} `)}
                </li>
                <li>
                  Suggested by:{" "}
                  {findUser(bookData[index]?.suggestedBy) === "user not found"
                    ? " (loading...)"
                    : findUser(bookData[index]?.suggestedBy)}{" "}
                </li>
              </ul>
              <div className={style.buttonCon}>
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
  );
};

export default RandomSectionRight;
