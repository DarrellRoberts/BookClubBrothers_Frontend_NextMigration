"use client"
import React, { useEffect } from "react"
import { useState } from "react"
import TextInfo from "./components/TextInfo"
import ThreeScene from "./components/ThreeScene"
import Loader from "@/components/loader/Loader"
import { Book } from "@/types/BookInterface"
import { Button } from "antd"
import { div } from "three/webgpu"

type Props = {
  readBooks: string[]
  readIds: string[]
  readBooksJson: Book[]
}

export default function Base({ readBooks, readIds, readBooksJson }: Props) {
  const [clicked, setClicked] = useState<boolean>(true)
  const [clickId, setClickId] = useState<string>(null)
  const [token, setToken] = useState<string | null>(null)
  const [renderIds, setRenderIds] = useState<string[]>([])
  const [startIndex, setStartIndex] = useState<number>(5)
  const [endIndex, setEndIndex] = useState<number>(11)

  const handleLoadMore = () => {
    setRenderIds([...renderIds, ...readBooks.slice(startIndex, endIndex)])
    setStartIndex((prev) => prev + 6)
    setEndIndex((prev) => prev + 5)
  }

  useEffect(() => {
    setRenderIds([...readIds])
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  return (
    <>
      {!clicked ? (
        <TextInfo clickId={clickId} readBooksJson={readBooksJson} />
      ) : null}
      <div className="flex justify-center align-center h-[106vh]">
        {readBooks.length < 0 ? (
          <Loader />
        ) : (
          <div className="flex flex-col w-full items-center overflow-hidden">
            <ThreeScene
              clicked={clicked}
              setClicked={setClicked}
              setClickId={setClickId}
              setRenderIds={setRenderIds}
              readIds={readIds}
              readBooks={readBooks}
              renderIds={renderIds}
              token={token}
            />
            {readBooks.length - 1 !== renderIds.length ? (
              <Button
                className="absolute bottom-30 max-sm:bottom-50"
                onClick={() => {
                  handleLoadMore()
                }}
                size="large"
              >
                Load more
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </>
  )
}
