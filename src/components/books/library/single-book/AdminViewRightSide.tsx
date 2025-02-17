import { Book } from "@/types/BookInterface";
import React from "react";
import "@/style/singlebook.css";
import "@/style/singlebookRes.css";
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores";
import EditActualDateButton from "@/components/forms/editbookform-single-book/datemeeting/EditActualDateButton";
import EditActualDate from "@/components/forms/editbookform-single-book/datemeeting/EditActualDate";
import EditDateButton from "@/components/forms/editbookform-single-book/datemeeting/EditDateButton";
import EditDate from "@/components/forms/editbookform-single-book/datemeeting/EditDate";
import EditPagesButton from "@/components/forms/editbookform-single-book/pages/EditPagesButton";
import EditPages from "@/components/forms/editbookform-single-book/pages/EditPages";
import EditPublishButton from "@/components/forms/editbookform-single-book/published/EditPublishButton";
import EditPublished from "@/components/forms/editbookform-single-book/published/EditPublished";
import EditAuthorButton from "@/components/forms/editbookform-single-book/author/EditAuthorButton";
import EditAuthor from "@/components/forms/editbookform-single-book/author/EditAuthor";
import { dateFormatter } from "@/utils/time-functions/dateFormatter";
import { useAppSelector } from "@/store/lib/hooks";
import EditGenreButton from "@/components/forms/editbookform-single-book/genre/EditGenreButton";
import EditGenre from "@/components/forms/editbookform-single-book/genre/EditGenre";

type Props = {
  bookData: Book;
  bookId: string;
};

const AdminViewRightSide: React.FC<Props> = ({ bookData, bookId }) => {
  const { showAuthor, showPublish, showGenre, showDate, showPage } =
    useAppSelector((state) => state.editBookButtons);

  return (
    <ul>
      <li className="mt-5 underline">Author</li>
      <li className="">
        {showAuthor ? (
          <EditAuthor inAuthor={bookData?.author} id={bookId} />
        ) : (
          bookData?.author
        )}
      </li>
      <span>
        <EditAuthorButton />
      </span>

      <li className="mt-5 underline">Published in</li>
      <li className="">
        {showPublish ? (
          <EditPublished inPublish={bookData?.yearPublished} id={bookId} />
        ) : bookData?.yearPublished < 0 ? (
          Math.abs(bookData?.yearPublished) + " BCE"
        ) : (
          bookData?.yearPublished
        )}
      </li>
      <EditPublishButton />
      <li className="mt-5 underline">Number of pages</li>
      {showPage ? (
        <EditPages inPages={bookData?.pages} id={bookId} />
      ) : (
        <li className="">{bookData?.pages}</li>
      )}
      <EditPagesButton />

      <li className="mt-5 underline">Genres</li>
      {showGenre ? (
        <EditGenre id={bookId} inGenre={bookData?.genre?.map((type) => type)} />
      ) : (
        bookData?.genre?.map((type, i) => (
          <li key={i}>
            {type[bookData?.genre?.length - 1] ? ` ${type}` : ` ${type},`}
          </li>
        ))
      )}
      <EditGenreButton />

      <li className="mt-5 underline">Planned Meeting Date</li>
      <li className="">
        {showDate ? (
          <EditDate id={bookId} />
        ) : bookData?.dateOfMeeting ? (
          dateFormatter(bookData?.dateOfMeeting)
        ) : (
          "???"
        )}
      </li>
      <EditDateButton />

      <li className="mt-5 underline">Actual Meeting Date</li>
      <li className="">
        {showDate ? (
          <EditActualDate id={bookId} />
        ) : bookData?.actualDateOfMeeting ? (
          dateFormatter(bookData?.actualDateOfMeeting)
        ) : (
          "???"
        )}
      </li>
      <EditActualDateButton />
      <li className="mt-5 underline">Score</li>
      <li className="">
        {handleHideScores_NoSetter(bookData?.actualDateOfMeeting)
          ? "?"
          : bookData?.totalScore}
      </li>
    </ul>
  );
};

export default AdminViewRightSide;
