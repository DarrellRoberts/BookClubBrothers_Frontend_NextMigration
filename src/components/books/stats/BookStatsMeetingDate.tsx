import LineGraph from "@/components/graphs/brothers/LineGraph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { dateFormatter } from "@/utils/time-functions/dateFormatter";
import { Book } from "@/types/BookInterface";
import React from "react";

type Props = {
  readBooks: Book[];
  loadingBooks: boolean;
};

const BookStatsMeetingDate: React.FC<Props> = ({ readBooks, loadingBooks }) => {
  const dateArray: string[] = readBooks?.map((book) =>
    dateFormatter(book.actualDateOfMeeting)
  );
  const yearArray: string[] | number[] = dateArray
    ?.map((date) => date.split(" ")[3])
    .reverse();
  const yearMatchArray: string[] = [...new Set(yearArray)];
  const findYearCount = (year: string, yearArray: string[]): number => {
    return yearArray.filter((yr) => yr === year).length;
  };
  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2));
  const labelArray = readBooks?.map((book) => book.title);

  return (
    <>
      <div>
        <ul>
          {yearMatchArray?.map((year, i) => (
            <li key={i}>
              {year}: {findYearCount(year, yearArray)} book(s)
            </li>
          ))}
        </ul>
      </div>
      {loadingBooks ? (
        <LoaderNoText />
      ) : (
        <LineGraph
          labelArray={labelArray.slice().reverse()}
          dateArray={dateArray.slice().reverse()}
          scoreArray={totalScoreArray.slice().reverse()}
          xAxes={"Meeting Date"}
        />
      )}
    </>
  );
};

export default BookStatsMeetingDate;
