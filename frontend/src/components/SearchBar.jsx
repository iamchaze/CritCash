// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";

const SearchBar = ({
  onSearch,
  delay = 300,
  placeholder = "Search...",
  objectName = "",
  inputObjectName = "",
}) => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, delay);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div objectName={objectName}>
      <input
        className="bg-gray-100 rounded-full p-3 pl-5 w-full h-full font-[REM] text-md border-2 text-gray-500 border-gray-300 focus:outline-accent1"
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        objectName={inputObjectName}
      />
    </div>
  );
};

export default SearchBar;
