/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Book } from "@/types/BookInterface";
import { User } from "@/types/UserInterface";
import { AutoComplete, Avatar, Input, Space } from "antd";
import { useState } from "react";
import { formatServerDate } from "@/functions/time-functions/formatServerDate";
import style from "./search.module.css";

interface Props {
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
  filteredBooks?: Book[];
  filteredUsers?: User[];
}

const SearchBar: React.FC<Props> = ({
  setSearchBar,
  filteredBooks,
  filteredUsers,
}) => {
  const [inputValue, setValue] = useState("");
  const { Search } = Input;
  const autoCompleteData = filteredBooks ? filteredBooks : filteredUsers;

  const capitaliseFirst = (e) =>
    e.charAt(0).toUpperCase() + inputValue.slice(1);

  const onSearch = () => {
    setSearchBar(capitaliseFirst(inputValue));
    setValue("");
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setSearchBar(capitaliseFirst(e.target.value));
  };

  const onSelect = (value: string) => {
    setSearchBar(value);
    setValue("");
  };

  const options = autoCompleteData?.map((item) =>
    item.title
      ? {
          value: item.title,
        }
      : {
          value: item.username,
          label: (
            <div className={style.autocompleteGrid}>
              <div className={style.autocompleteDetails}>
                <Avatar size="large" src={item?.userInfo?.profileURL}></Avatar>
                <h2 className={style.autocompleteUsername}>{item?.username}</h2>
              </div>
              <span>Last login: {formatServerDate(item?.lastLoggedIn)}</span>
            </div>
          ),
        }
  ) ?? [{ value: "No results loaded" }];

  return (
    <>
      <Space direction="vertical">
        <AutoComplete onSelect={onSelect} options={options}>
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
    </>
  );
};

export default SearchBar;
