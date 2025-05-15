import React from "react";
import axios from "axios";
import useDebounce from "../utils/debounce";
import { useState, useEffect } from "react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [noUsersError, setNoUsersError] = useState(null)
  const debouncedSearch = useDebounce(searchTerm, 300);
  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearch.length > 2) {
        const searchResponse = await axios.get(
          `http://localhost:5000/api/v1/users/getUsers?searchquery=${debouncedSearch}`,
          { withCredentials: true }
        );
        console.log(searchResponse.data.users);
        if (searchResponse.data.users === undefined) {
          setSearchResults(null);
          setNoUsersError("No users Found")
        } else {
          setSearchResults(searchResponse.data.users);
          setNoUsersError(null)
        }
      } else {
        setSearchResults("")
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
        <div>
          {searchResults &&
            searchResults.map((user) => {
              return (
                <div key={user.username}>
                  <h3>{`${user.firstName} ${user.lastName}`}</h3>
                  <span>{`${user.contact}`}</span>{" "}
                  <span>{`${user.walletId}`}</span>
                </div>
              );
            })}
        </div>
        {noUsersError && noUsersError}
      </div>
    </>
  );
};

export default SearchBox;
