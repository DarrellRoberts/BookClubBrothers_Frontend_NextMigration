import React from "react";
import BrotherTableDesktop from "./BrotherTableDesktop";
import BrotherTableTablet from "./BrotherTableTablet";
import { type User } from "@/types/UserInterface";
import { type Book } from "@/types/BookInterface";
import LoaderNoText from "@/components/loader/LoaderNoText";

type Props = {
  userData: User[];
  bookData: Book[];
};

const BrotherTable: React.FC<Props> = ({ userData, bookData }) => {
  return (
    <>
      {userData && bookData ? (
        <>
          <BrotherTableDesktop userData={userData} bookData={bookData} />
          <BrotherTableTablet userData={userData} bookData={bookData} />
        </>
      ) : (
        <LoaderNoText />
      )}
    </>
  );
};

export default BrotherTable;
