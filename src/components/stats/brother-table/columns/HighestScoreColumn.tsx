import React from "react";

type Props = {
  maxScoreArray: number[];
};

const HighestScoreColumn: React.FC<Props> = ({ maxScoreArray }) => {
  return (
    <div>
      <h2 className="underline">Highest Score</h2>
      {maxScoreArray?.map((title, index) => (
        <h2 key={index}>{title}</h2>
      ))}
    </div>
  );
};

export default HighestScoreColumn;
