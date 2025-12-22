"use client"

import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import { AutoComplete, Input, Space } from "antd"
import { useState } from "react"
import { formatServerDate } from "@/utils/time-functions/formatServerDate"
import style from "./search.module.css"
import ProfileSmall from "../profile/ProfileSmall"
import Link from "next/link"

interface Props {
  setSearchBar: React.Dispatch<React.SetStateAction<string>>
  filteredBooks?: Book[]
  filteredUsers?: User[]
  isDisabled: boolean
}

const SearchBar: React.FC<Props> = ({
  setSearchBar,
  filteredBooks,
  filteredUsers,
  isDisabled,
}) => {
  const [inputValue, setValue] = useState("")
  const { Search } = Input
  const autoCompleteData = filteredBooks ? filteredBooks : filteredUsers

  const onSearch = () => {
    setSearchBar(inputValue)
    setValue("")
  }

  const handleInputChange = (e) => {
    setValue(e.target.value)
    setSearchBar(e.target.value)
  }

  const onSelect = (value: string) => {
    setSearchBar(value)
    setValue("")
  }

  const options = autoCompleteData?.map((item) =>
    item.title
      ? {
          value: item.title,
          label: (
            <div>
              <Link href={`/books/library/${item._id}`}>
                <div>
                  <h2 className="underline text-black font-main font-normal">
                    {item?.title}
                  </h2>
                </div>
                <div className="flex gap-1">
                  <span className="text-black font-main font-normal">
                    Total Score:{" "}
                  </span>
                  <span className="text-black font-main font-normal">
                    {item?.totalScore ?? "?"}
                  </span>
                </div>
              </Link>
            </div>
          ),
        }
      : {
          value: item.username,
          label: (
            <div className={style.autocompleteUserGrid}>
              <Link
                href={`/brothers/library/${item.username}`}
                className={style.autocompleteDetails}
              >
                <ProfileSmall imageURL={item?.userInfo?.profileURL} />
                <div className="flex flex-col">
                  <h2 className={style.autocompleteUsername}>
                    {item?.username}
                  </h2>
                  <div className="flex flex-col">
                    <span style={{ color: "black" }}>Last login: </span>
                    <span style={{ color: "black" }}>
                      {formatServerDate(item?.lastLoggedIn)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ),
        }
  ) ?? [{ value: "", label: <h2>No results loaded</h2> }]

  options.push({
    value: "",
    label: (
      <div className={style.endOfAutocomplete}>
        <h2>Scroll down the webpage</h2>
        <h2>to load more results</h2>
      </div>
    ),
  })

  return (
    <Space orientation="vertical">
      <AutoComplete onSelect={onSelect} options={options} disabled={isDisabled}>
        <Search
          placeholder="Search by book title"
          value={inputValue}
          enterButton="Search"
          size="large"
          onChange={handleInputChange}
          onSearch={onSearch}
          allowClear
        />
      </AutoComplete>
    </Space>
  )
}

export default SearchBar
