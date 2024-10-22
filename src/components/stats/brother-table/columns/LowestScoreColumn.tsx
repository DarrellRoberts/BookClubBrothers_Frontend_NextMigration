import React from "react";

type Props = {
  minScoreArray: number[];
};

const HighestScoreColumn: React.FC<Props> = ({ minScoreArray }) => {
  return (
    <div>
      <h2 className="underline">Lowest Score</h2>
      {minScoreArray?.map((title, index) => (
        <h2 key={index}>{title}</h2>
      ))}
    </div>
  );
};

export default HighestScoreColumn;
