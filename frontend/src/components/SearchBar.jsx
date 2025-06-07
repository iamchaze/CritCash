// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";

const SearchBar = ({
  onSearch,
  delay = 300,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
}) => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, delay);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div className={className}>
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={inputClassName}
      />
    </div>
  );
};

export default SearchBar;
