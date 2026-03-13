import QuizComponent from "./QuizComponent"

const Quiz = () => {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center mt-20">
        <h1 className="underline text-4xl">Quiz</h1>
        <QuizComponent />
      </div>
    </div>
  )
}

export default Quiz
