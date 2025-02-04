/* eslint-disable react/react-in-jsx-scope */
"use client";

import QuizComponent from "@/components/books/quiz/QuizComponent";
import "@/style/quiz.css";
import "@/style/quizRes.css";

const Quiz: React.FC = () => {
  return (
    <>
      <div className="h-screen">
        <div className="bookQuizCon flex flex-col items-center mt-20">
          <h1 className="underline">Quiz</h1>
          <QuizComponent />
        </div>
      </div>
    </>
  );
};

export default Quiz;
