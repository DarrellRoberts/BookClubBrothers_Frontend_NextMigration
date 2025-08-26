import React from "react"
import BookWorm from "./badge-folder/BookWorm"
import LoneWolf from "./badge-folder/LoneWolf"
import CommentWorm from "./badge-folder/CommentWorm"
import FirstBook from "./badge-folder/FirstBook"
import GodWorm from "./badge-folder/GodWorm"
import PunctualWorm from "./badge-folder/PunctualWorm"

type Props = {
  badgeData: {
    loneWolf: number
    allBooks: boolean
    mostBooks: boolean
    fiveComments: boolean
    firstBook: boolean
    punctual: number
  }
  isVertical?: boolean
}

const Badges: React.FC<Props> = ({ badgeData, isVertical }) => {
  return (
    <div className={isVertical ? "grid grid-rows-6 h-150 gap-10" : "flex"}>
      <FirstBook firstBookWorm={badgeData?.firstBook} isVertical={isVertical} />
      <BookWorm bookWorm={badgeData?.allBooks} isVertical={isVertical} />
      <LoneWolf loneWolf={badgeData?.loneWolf} isVertical={isVertical} />
      <CommentWorm
        commentWorm={badgeData?.fiveComments}
        isVertical={isVertical}
      />
      <GodWorm godWorm={badgeData?.mostBooks} isVertical={isVertical} />
      <PunctualWorm
        punctualWorm={badgeData?.punctual}
        isVertical={isVertical}
      />
    </div>
  )
}

export default Badges
