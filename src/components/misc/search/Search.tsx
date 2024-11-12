/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Input, Space } from "antd";
import { useState } from "react";

interface Props {
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({ setSearchBar }) => {
  const [inputValue, setValue] = useState("");
  const { Search } = Input;

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

  return (
    <>
      <Space direction="vertical">
        <Search
          onSearch={onSearch}
          placeholder="Search by book title"
          value={inputValue}
          enterButton="Search"
          size="large"
          onChange={handleInputChange}
        />
      </Space>
    </>
  );
};

export default SearchBar;
