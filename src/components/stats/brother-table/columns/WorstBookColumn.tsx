import React from "react";

type Props = {
  worstBooks: string[];
};

const WorstBookColumn: React.FC<Props> = ({ worstBooks }) => {
  return (
    <div>
      <h2 className="underline">Worst Book</h2>
      {worstBooks?.map((book, index) => (
        <h2 key={index}>{book}</h2>
      ))}
    </div>
  );
};

export default WorstBookColumn;
