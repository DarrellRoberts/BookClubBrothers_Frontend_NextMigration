// import { config } from "@/configs/config"
// import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
// import { useAppSelector } from "@/store/lib/hooks"
// import React, { memo, useMemo } from "react"
// import { useJwt } from "react-jwt"

// type Props = {
//   totalScore: number
//   ratingArr: number[] | number
//   raterArr: string[]
//   hideScores: boolean
// }

// const BookRatingsBox = ({
//   totalScore,
//   ratingArr,
//   raterArr,
//   hideScores,
// }: Props) => {
//   const token = useAppSelector((state) => state.token.tokenState)
//   const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
//     useJwt(token)
//   const username = decodedToken?.username

//   const { userData, loadingUsers, error } = useUserFetch(
//     `${config.API_URL}/users`,
//     null,
//   )

//   const formattedRatings = useMemo(() => {
//     if (!userData || !raterArr || !Array.isArray(ratingArr)) return []

//     const userLookup = userData.reduce(
//       (acc, user) => {
//         acc[user._id] = user.username
//         return acc
//       },
//       {} as Record<string, string>,
//     )

//     return raterArr.map((id, index) => ({
//       name: userLookup[id] || "User not found",
//       score: Array.isArray(ratingArr) ? ratingArr[index] : 0,
//     }))
//   }, [userData, raterArr, ratingArr])
//   return (
//     <div className="flex flex-col items-start font-main text-xl ml-2 max-md:text-base">
//       <h2 className="underline mb-5">Book Club Brothers</h2>

//       {!loadingUsers && formattedRatings.length > 0 ? (
//         formattedRatings.map(({ name, score }) => (
//           <li className="list-none mb-1 ml-2" key={name}>
//             {name}: {hideScores && username !== name ? "?" : score.toFixed(2)}
//           </li>
//         ))
//       ) : error ? (
//         <li>{error?.message}</li>
//       ) : (
//         <li className="list-none mb-1 ml-2">Score Pending...</li>
//       )}

//       <li className="list-none mt-auto font-bold">
//         Group Rating:{" "}
//         {totalScore
//           ? hideScores
//             ? "?"
//             : Math.floor(totalScore * 100) / 100
//           : "Pending..."}
//       </li>
//     </div>
//   )
// }

// export default BookRatingsBox
