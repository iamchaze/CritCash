// components/SearchBar.jsx
import React, { useState, useEffect } from "react";
import useDebounce from "../utils/debounce";

const SearchBar = ({
  onSearch,
  delay = 300,
  placeholder = "Search...",
  objectname = "",
  inputObjectName = "",
}) => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, delay);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced]);

  return (
    <div objectname={objectname}>
      <input
        className="bg-gray-100 shadow-2xl rounded-full py-2 pl-5 w-full h-full font-[REM] text-md border-2 text-gray-500 border-gray-300 focus:outline-accent1"
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        objectname={inputObjectName}
      />
    </div>
  );
};

export default SearchBar;
