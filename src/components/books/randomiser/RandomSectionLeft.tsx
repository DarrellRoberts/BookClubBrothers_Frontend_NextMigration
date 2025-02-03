import React from "react";
import style from "./randomiser.module.css";
import LoaderNoText from "@/components/loader/LoaderNoText";
import CreateUnreadBook from "@/components/forms/bookform-randomise/CreateUnreadBook";
import { Book } from "@/types/BookInterface";
import { User } from "@/types/UserInterface";
import { useAuth } from "@/hooks/auth-hooks/useAuth";
import { useAppDispatch } from "@/store/lib/hooks";
import { setIndex } from "@/store/lib/features/randomise/randomiseSlice";

type Props = {
  loadingBooks: boolean;
  loadingUsers: boolean;
  bookData: Book[];
  userData: User[];
};

const RandomSectionLeft: React.FC<Props> = ({
  loadingBooks,
  loadingUsers,
  bookData,
  userData,
}) => {
  const { decodedToken } = useAuth();
  const dispatch = useAppDispatch();

  const findUser = (id) => {
    const user = userData?.find((user) => user._id === id);
    return user ? user.username : "user not found";
  };

  return (
    <div className={style.randomBoxLeft}>
      <div className={style.randomBoxLeftList}>
        {loadingBooks && loadingUsers ? (
          <div className="flex justify-center items-center mt-20">
            <LoaderNoText />
          </div>
        ) : (
          bookData?.map((book, i) => (
            <div
              key={i}
              className={style.bookBox}
              // add conditional as otherwise creates bug for onClick Modal
              onClick={() => dispatch(setIndex(bookData.indexOf(book)))}
            >
              <h2>{book?.title}</h2>
              <p>
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

      <div className={style.leftBottomInfo + " mt-5"}>
        <h2 className="text-black mt-5">
          Scroll the list above for suggested books or add your own at the end
        </h2>
        <h2 className="text-black mt-5">
          Click randomise on the right to randomise the selection or click on
          each item in the list to see its details.
        </h2>
        {!loadingBooks && !loadingUsers ? (
          <h2 className={style.adminText}>
            Only the admin can select the book.
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default RandomSectionLeft;
