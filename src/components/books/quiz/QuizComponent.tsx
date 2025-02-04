import React, { useState } from "react";
import quiz from "./quiz.json";
import "@/style/quiz.css";
import "@/style/quizRes.css";

const QuizComponent = () => {
  const [showCorrect, setShowCorrect] = useState(false);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div className="quizTitle flex mb-5">
        <h2>
          {index < quiz.length
            ? `Question: ${index + 1}/${quiz.length}`
            : `You got ${counter} correct. ${
                counter > Math.floor(quiz.length / 2)
                  ? "Great job 🤓!"
                  : "Very poor...you might need brush up on your Aurelianos🧔"
              }`}
        </h2>
      </div>

      <div className="quizQuestionCon flex flex-col">
        <h2 className="mb-2 font-bold">{quiz[index]?.question}</h2>
        <ul>
          {quiz[index]?.options?.map((option, i) =>
            !showCorrect ? (
              <>
                <li
                  className="cursor-pointer list-disc hover:bg-black hover:text-white"
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    const target = e.target as HTMLLIElement;
                    const clickedOption = target.textContent;

                    if (clickedOption === quiz[index].correctAnswer) {
                      setCounter(counter + 1);
                    }

                    setShowCorrect(true);
                  }}
                >
                  {option}
                </li>
                <li></li>
              </>
            ) : (
              <li
                key={i}
                className={
                  option === quiz[index].correctAnswer
                    ? "text-green-500 font-bold list-disc"
                    : "text-red-500"
                }
              >
                {option}
              </li>
            )
          )}
          {showCorrect ? (
            <li
              className="cursor-pointer absolute right-1 top-32 font-bold"
              onClick={() => {
                setIndex(index + 1);
                setShowCorrect(false);
              }}
            >
              Next question
            </li>
          ) : null}
          {index > quiz.length - 1 ? (
            <li
              className="cursor-pointer absolute right-1 top-32 font-bold"
              onClick={() => {
                setIndex(0);
                setCounter(0);
                setShowCorrect(false);
              }}
            >
              Restart quiz
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
};

export default QuizComponent;
