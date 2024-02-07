import { useState } from "react"
import "../../style/quiz.css"
import "../../style/quizRes.css"



const Quiz: React.FC = () => {

const [showCorrect, setShowCorrect] = useState(false)
const [index, setIndex] = useState(0)
const [counter, setCounter] = useState(0)

const quiz = {
    "quiz": [
      {
        "question": "Who is the protagonist and main character in 'Slaughterhouse-Five'?",
        "options": ["Billy Pilgrim", "Holden Caulfield", "Winston Smith", "Raskolnikov"],
        "correctAnswer": "Billy Pilgrim"
      },
      {
        "question": "What mystical element is a recurring theme throughout 'One Hundred Years of Solitude'?",
        "options": ["Time travel", "Magical realism", "Telekinesis", "Parallel universes"],
        "correctAnswer": "Magical realism"
      },
      {
        "question": "What is the dream that George and Lennie share in 'Of Mice and Men'?",
        "options": ["Owning a ranch", "Becoming famous actors", "Finding buried treasure", "Becoming astronauts"],
        "correctAnswer": "Owning a ranch"
      },
      {
        "question": "In 'Fahrenheit 451', what do the 'firemen' burn?",
        "options": ["Wooden sculptures", "Books", "Houses", "People"],
        "correctAnswer": "Books"
      },
      {
        "question": "Who is the ancient Chinese military strategist credited with 'The Art of War'?",
        "options": ["Confucius", "Sun Tzu", "Laozi", "Mencius"],
        "correctAnswer": "Sun Tzu"
      },
      {
        "question": "Who are the main characters in 'Les Enfants Terribles'?",
        "options": ["Brothers and sisters", "Lovers", "Detectives", "Warriors"],
        "correctAnswer": "Brothers and sisters"
      },
      {
        "question": "What is the main theme explored in 'White Noise'?",
        "options": ["Time travel", "Media saturation", "Political intrigue", "Superhuman abilities"],
        "correctAnswer": "Media saturation"
      },
      {
        "question": "What is the central theme of 'The Island of Doctor Moreau'?",
        "options": ["Scientific experimentation", "Romantic love", "Time travel", "Environmental conservation"],
        "correctAnswer": "Scientific experimentation"
      },
      {
        "question": "What is the primary message of 'How to Do Nothing'?",
        "options": ["Embracing boredom", "Maximizing productivity", "Avoiding nature", "Constant connectivity"],
        "correctAnswer": "Embracing boredom"
      },
      {
        "question": "Which city serves as the backdrop for the stories in 'Dubliner'?",
        "options": ["Paris", "London", "Dublin", "New York"],
        "correctAnswer": "Dublin"
      },
      {
        "question": "What is the setting of 'The God of Small Things'?",
        "options": ["New York City", "Kerala, India", "Tokyo", "London"],
        "correctAnswer": "Kerala, India"
      },
      {
        "question": "Who is the author of 'Treasure Island'?",
        "options": ["Charles Dickens", "Jules Verne", "Robert Louis Stevenson", "Mark Twain"],
        "correctAnswer": "Robert Louis Stevenson"
      },
      {
        "question": `You got ${counter} correct. ${counter > 7 ? "Great job!🤓" : "Very poor...you might need brush up on your Aurelianos.🧔"}`,
      },
    ]
  }

    return (
<>
<div className="quizCon flex flex-col top-28 mt-5 mb-5">

<div className="quizTitle flex justify-between mb-5">
<h1 className="underline">Quiz</h1>
<h2>{index <= 11 ? `Question: ${index + 1}/${quiz.quiz.length - 1}`: null}</h2>
</div>

<div className="quizQuestionCon flex flex-col">
<h2 className="mb-2 font-bold">{quiz?.quiz[index]?.question}</h2>
<ul>
    {quiz?.quiz[index]?.options?.map((option) => 
        !showCorrect ? (
        <>
        <li
        className="cursor-pointer list-disc hover:bg-black hover:text-white"
        onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            const target = e.target as HTMLLIElement;
            const clickedOption = target.textContent;
        
        if (clickedOption === quiz?.quiz[index].correctAnswer) {
        setCounter(counter + 1);
        } 
        
        setShowCorrect(true); }}
        >
        {option}
        </li>
        <li></li>
        </>
        )
    : (
        <li
        className={option === quiz?.quiz[index].correctAnswer ? "text-green-500 font-bold list-disc" : "text-red-500"}
        >
        {option}
        </li>
    )
    )}
{showCorrect ? (
            <li
            className="cursor-pointer absolute right-1 bottom-1 font-bold"
            onClick={() => {
                setIndex(index + 1);
                setShowCorrect(false)
            }}
            >
            Next question
            </li>)
            : null}
{index > 11 ? (
                <li
                className="cursor-pointer absolute right-1 bottom-1 font-bold"
                onClick={() => {
                    setIndex(0);
                    setCounter(0);
                    setShowCorrect(false)
                }}
                >
                Restart quiz
                </li>
) : null}
</ul>
</div>
</div>
</>
    )
}

export default Quiz