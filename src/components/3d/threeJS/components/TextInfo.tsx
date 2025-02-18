import React from "react";
import style from "./3d.module.css";
import Link from "next/link";
import { Button } from "antd";
import { Book } from "@/types/BookInterface";

type Props = {
  readBooksJson: Book[];
  // readBooks: string[];
  clickId: string;
};

export default function TextInfo({
  // readBooks,
  clickId,
  readBooksJson,
}: Props) {
  const bookInfo = readBooksJson.find((book) => book._id === clickId);
  return (
    <div className={style.textInfo}>
      <h2 className="underline">{bookInfo?.title}</h2>
      <h2>by {bookInfo?.author}</h2>
      <ul>
        <li>Pages: {bookInfo?.pages}</li>
        <li>Year Published: {bookInfo?.yearPublished}</li>
        <li>Score: {bookInfo?.totalScore}</li>
      </ul>
      <Link href={`/books/library/${bookInfo._id}`}>
        <Button>More Info</Button>
      </Link>
    </div>
  );
}
