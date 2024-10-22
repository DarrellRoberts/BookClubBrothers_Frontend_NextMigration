import React from "react";

type Props = {
  bestBooks: string[];
};

const BestBookColumn: React.FC<Props> = ({ bestBooks }) => {
  return (
    <div>
      <h2 className="underline">Best Book</h2>
      {bestBooks?.map((book, index) => (
        <h2 key={index}>{book}</h2>
      ))}
    </div>
  );
};

export default BestBookColumn;
