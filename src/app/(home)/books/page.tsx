import React from "react"
import { UiButton } from "@/components/ui/button/UiButton"

const BookHomepage: React.FC = () => {
  const dashboardLinks = [
    {
      text: "Library",
      link: "/books/library",
    },
    {
      text: "Randomiser",
      link: "/books/randomiser",
    },
    {
      text: "Quiz",
      link: "/books/quiz",
    },
    {
      text: "Stats",
      link: "/books/stats",
    },
  ]
  return (
    <div className="h-[calc(85vh-100px)] max-xs:h-[calc(85vh-75px)]">
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        The Books
      </h1>
      <div className="flex justify-center ">
        <div className="flex justify-evenly w-full">
          {dashboardLinks.map((btn) => (
            <UiButton
              isLink
              href={btn.link}
              textContent={btn.text}
              key={btn.text}
            />
          ))}
        </div>
      </div>
      <div
        className="flex justify-center mt-5 h-2/3"
        style={{
          backgroundImage: `url('/book-dashboard-library-background-image.webp')`,
          backgroundPosition: "50% 70%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  )
}

export default BookHomepage
