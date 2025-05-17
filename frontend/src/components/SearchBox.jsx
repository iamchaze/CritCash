import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../utils/debounce";

const SearchBox = ({ sendData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearch.length > 2) {
        try {
          const searchResponse = await axios.get(
            `http://localhost:5000/api/v1/users/getUsers?searchquery=${debouncedSearch}`,
            { withCredentials: true }
          );
          const users = searchResponse.data.users;

          sendData(users?.length > 0 ? users : null, true);
        } catch (err) {
          console.error(err);
          sendData(null, true);
        }
      } else {
        sendData(null, false); // not a real search
      }
    };

    searchUsers();
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, contact or WalletId"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
