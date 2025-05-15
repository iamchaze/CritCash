import React from "react";
import axios from "axios";
import useDebounce from "../utils/debounce";
import { useState, useEffect } from "react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearch.length > 3) {
        const searchResponse = await axios.get(
          `http://localhost:5000/api/v1/users/getUsers?searchquery=${debouncedSearch}`,
          { withCredentials: true }
        );
        console.log(searchResponse);
        if (!searchResponse) {
          setSearchResults(`No Users Found`);
        } else {
        //   setSearchResults(searchResponse.data);
        console.log(searchResponse);
        }
      }
    };
    searchUsers();
  }, [debouncedSearch]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by name, contact or WalletId"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>{searchResults}</div>
      </div>
    </>
  );
};

export default SearchBox;
