// "use client"

// import Image from "next/image"
// import { useState } from "react"
// import BookRatingsBox from "./BookRatingsBox"

// type Props = {
//   title: string
//   totalScore: number
//   ratingArr: number[] | number
//   raterArr: string[]
//   hideScores: boolean
//   isSingleBook?: boolean
//   imageURL: string
// }

// const BookCover: React.FC<Props> = ({
//   title,
//   totalScore,
//   ratingArr,
//   raterArr,
//   hideScores,
//   isSingleBook,
//   imageURL,
// }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   return (
//     <>
//       <div
//         className={
//           isSingleBook
//             ? "w-[600px] h-[400px] border-2 border-[var(--default-border-color)] flex justify-center text-center items-center border-solid m-5 max-md:mx-0 max-sm:h-full max-sm:w-full"
//             : "flex justify-center items-center text-center border-5 border-solid border-[var(--default-border-color)] h-63 max-md:w-75 w-90"
//         }
//       >
//         <div className="flex h-full w-full">
//           {isLoading && (
//             <div className="leftcover flex w-[45%] flex-col items-center justify-center bg-black text-white">
//               <h2 className="font-main text-2xl max-md:text-base">{title}</h2>
//               <h2 className="font-main text-2xl max-md:text-base">
//                 (Image pending)
//               </h2>
//             </div>
//           )}
//           {imageURL && (
//             <div className="w-[45%] max-sm:w-[50%]">
//               <Image
//                 key={imageURL}
//                 src={imageURL}
//                 width={500}
//                 height={500}
//                 alt={title}
//                 className={
//                   isSingleBook
//                     ? "w-full h-100 max-sm:h-65"
//                     : "h-60 w-50 max-sm:w-fit"
//                 }
//                 style={{ display: isLoading ? "hidden" : "block" }}
//                 onLoad={() => setIsLoading(false)}
//               />
//             </div>
//           )}
//           <BookRatingsBox
//             totalScore={totalScore}
//             ratingArr={ratingArr}
//             raterArr={raterArr}
//             hideScores={hideScores}
//           />
//         </div>
//       </div>
//     </>
//   )
// }

// export default BookCover
