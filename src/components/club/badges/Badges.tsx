import { badges } from "@/configs/badges"
import BadgeCollection from "./badges/BadgeCollection"
import { BadgeTitles } from "@/types/Badges"

const Badges: React.FC = () => {
  const badgeData = {
    loneWolf: 1,
    allBooks: true,
    mostBooks: true,
    fiveComments: true,
    firstBook: true,
    punctual: 1,
  }

  return (
    <>
      <h1 className="text-8xl m-4 max-sm:text-6xl">Badges</h1>
      <div className="flex justify-center gap-20">
        <BadgeCollection badgeData={badgeData} isVertical={true} />
        <div className="grid grid-rows-6 h-150 gap-10 items-center">
          {badges.map((badge, i) => (
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

export default Badges
