/* eslint-disable react/prop-types */
"use client"

import React, { useMemo } from "react"
import { useState } from "react"
import CommentButton from "../../../forms/commentform/CommentButton"
import EditCommentButton from "../../../forms/commentform/EditCommentButton"
import { useJwt } from "react-jwt"
import { type Book } from "@/types/BookInterface"
import {
  findComment,
  findCommentByUsername,
} from "@/utils/comment-functions/findComments"
import { findUserByUsername } from "@/utils/find-functions/find"
import Link from "next/link"
import ProfileSmall from "@/components/misc/profile/ProfileSmall"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"

type Props = {
  bookData: Book
  id: string
  hideScores: boolean
}

const CommentCon: React.FC<Props> = ({ bookData, id, hideScores }) => {
  const [addComment, setAddComment] = useState<boolean>(false)
  const [showEditComment, setShowEditComment] = useState<boolean>(false)

  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token)
  const username = decodedToken?.username
  const { userData, loadingUsers, error } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  )

  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const commentArray = useMemo(() => {
    return findComment(bookData, userData)
  }, [bookData, userData])

  const initialComment = useMemo(
    () => findCommentByUsername(username, bookData, userData),
    [username, bookData, userData]
  )

  return (
    <>
      <div
        className={`border-2 border-[var(--default-border-color)] flex flex-col items-center justify-start lg:w-[600px] ml-8 text-[var(--main-font-color)] font-main max-md:w-full max-md:m-8 max-md:p-4 ${
          commentArray?.length > 0 ? "h-auto" : "h-50"
        }`}
      >
        <h2 className="text-4xl text-center font-main underline">Comments</h2>
        {error ? (
          <h2>{error.message}</h2>
        ) : loadingUsers ? (
          <div className="flex flex-col items-center my-2">
            <Skeleton.Node
              active={true}
              style={{
                width: 300,
                height: 400,
                filter: isDarkMode ? "invert(1)" : "invert(0)",
              }}
            >
              <Skeleton className="mx-6" />
            </Skeleton.Node>
          </div>
        ) : (
          Array.isArray(commentArray) &&
          commentArray?.map(([name, value], i) => {
            const foundUser = findUserByUsername(name, userData)
            const imageURL =
              typeof foundUser !== "string"
                ? foundUser?.userInfo?.profileURL
                : null
            return (
              <div
                className="flex m-4 mx-8 bg-black text-white justify-around p-4 rounded-2xl  max-md:flex-col"
                key={i}
              >
                <div>
                  <h3 className=" max-lg:text-4xl  max-md:text-center">
                    {name}
                  </h3>
                  <Link href={`/brothers/library/${name}`}>
                    <ProfileSmall imageURL={imageURL} />
                  </Link>
                </div>
                <li
                  className={`
                  ${hideScores && username !== name ? "text-3xl" : null} 
                  list-none mb-1 ml-2 flex items-center text-center
                   max-md:m-4  max-md:p-0  max-md:items-center max-md:justify-center
                `}
                >
                  {hideScores && username !== name ? "?" : `"${value}"`}
                </li>
              </div>
            )
          })
        )}

        {decodedToken ? (
          <div className="flex justify-center items-end mt-auto">
            {initialComment ? (
              <EditCommentButton
                showEditComment={showEditComment}
                setShowEditComment={setShowEditComment}
                id={id}
                inComment={initialComment}
              />
            ) : (
              <CommentButton
                addComment={addComment}
                setAddComment={setAddComment}
                id={id}
              />
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default CommentCon
