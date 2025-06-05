// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";

const SearchBar = ({ onSearch, delay=300 }) => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, delay);

  useEffect(() => {
    onSearch(debounced); // send debounced value to parent
  }, [debounced]);

  return (
    <input
      type="text"
      placeholder="Search by name, contact or walletKey"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default SearchBar;
