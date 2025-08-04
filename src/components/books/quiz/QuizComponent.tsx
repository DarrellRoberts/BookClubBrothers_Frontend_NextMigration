import React, { useState } from "react"
import quiz from "./quiz.json"

const QuizComponent = () => {
  const [showCorrect, setShowCorrect] = useState(false)
  const [index, setIndex] = useState(0)
  const [counter, setCounter] = useState(0)

  return (
    <>
      <div className="flex mb-5 font-[var(--main)] text-4xl md:text-2xl">
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

      <div className="flex flex-col border-2 border-black p-6 w-[500px] h-[300px] text-xl font-main max-md:w-[350px] max-md:p-4 max-md:top-[90px]">
        <h2 className="mb-2 font-bold">{quiz[index]?.question}</h2>
        <ul>
          {quiz[index]?.options?.map((option, i) =>
            !showCorrect ? (
              <>
                <li
                  className="list-disc cursor-pointer hover:bg-black hover:text-white"
                  onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                    const target = e.target as HTMLLIElement
                    const clickedOption = target.textContent

                    if (clickedOption === quiz[index].correctAnswer) {
                      setCounter(counter + 1)
                    }

                    setShowCorrect(true)
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
                    ? "list-disc font-bold text-green-500"
                    : "text-red-500"
                }
              >
                {option}
              </li>
            )
          )}
          {showCorrect ? (
            <li
              className="absolute right-1 top-32 cursor-pointer font-bold"
              onClick={() => {
                setIndex(index + 1)
                setShowCorrect(false)
              }}
            >
              Next question
            </li>
          ) : null}
          {index > quiz.length - 1 ? (
            <li
              className="absolute right-1 top-32 cursor-pointer font-bold"
              onClick={() => {
                setIndex(0)
                setCounter(0)
                setShowCorrect(false)
              }}
            >
              Restart quiz
            </li>
          ) : null}
        </ul>
      </div>
    </>
  )
}

export default QuizComponent
