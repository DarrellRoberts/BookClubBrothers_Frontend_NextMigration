import React from "react"
import Badges from "@/components/misc/badges/Badges"

const BadgesHomepage: React.FC = () => {
  const badgeData = {
    loneWolf: 1,
    allBooks: true,
    mostBooks: true,
    fiveComments: true,
    firstBook: true,
    punctual: 1,
  }
  const badgeTitles = [
    "Brother Worm",
    "Book Worm",
    "Lone Worm",
    "Comment Worm",
    "God of Worms",
    "Mad Hatter Worm",
  ]
  return (
    <>
      <h1 className="text-8xl m-4 max-sm:text-6xl">Badges</h1>
      <div className="flex justify-center gap-20">
        <Badges badgeData={badgeData} isVertical={true} />
        <div className="grid grid-rows-6 h-150 gap-10 items-center">
          {badgeTitles.map((badge, i) => (
            <div key={i}>
              <h2 className="text-4xl max-sm:text-2xl">{badge}</h2>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BadgesHomepage
