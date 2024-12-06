import React from "react";
import style from "./filters.module.css";

type Props = {
  sortBooksDefault: () => void;
  sortBooksHighest: () => void;
  sortBooksLowest: () => void;
  sortBooksOther?: () => void;
  type: string;
};

const Filters: React.FC<Props> = ({
  sortBooksDefault,
  sortBooksHighest,
  sortBooksLowest,
  sortBooksOther,
  type,
}) => {
  return (
    <div className={style.inputCon}>
      <label className={style.labelCon}>
        Lowest Score
        <input
          type="radio"
          onClick={() => {
            sortBooksLowest();
          }}
          name="sorting"
        />
      </label>
      <label className={style.labelCon}>
        Highest Score
        <input
          type="radio"
          onClick={() => {
            sortBooksHighest();
          }}
          name="sorting"
        />
      </label>
      <label className={style.labelCon}>
        Default
        <input
          type="radio"
          onClick={() => {
            sortBooksDefault();
          }}
          name="sorting"
          defaultChecked
        />
      </label>
      {type === "normal" ? null : (
        <label className={style.labelCon}>
          Read order
          <input
            type="radio"
            onClick={() => {
              sortBooksOther();
            }}
            name="sorting"
          />
        </label>
      )}
    </div>
  );
};

export default Filters;
