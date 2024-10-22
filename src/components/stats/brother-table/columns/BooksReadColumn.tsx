import React from "react";

type Props = {
  userBookLength: number[];
  bookLength: number;
};

const BooksReadColumn: React.FC<Props> = ({ userBookLength, bookLength }) => {
  return (
    <div>
      <h2 className="underline">Books read</h2>
      {userBookLength?.map((length, index) => (
        <h2 key={index}>
          {parseFloat(((length / bookLength) * 100).toFixed(2))}%
        </h2>
      ))}
    </div>
  );
};

export default BooksReadColumn;
