import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../utils/debounce";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(null);
  const debouncedSearch = useDebounce(searchTerm, 300);

  const navigate = useNavigate();
  const location = useLocation();
  const task = location.state?.task;

  const sendUserToTransaction = (user) => {
    navigate("/transaction", { state: { task, user } });
  };

  useEffect(() => {
    const searchUsers = async () => {
      if (debouncedSearch.length > 2) {
        try {
          const searchResponse = await axios.get(
            `http://localhost:5000/api/v1/users/getUsers?searchquery=${debouncedSearch}`,
            { withCredentials: true }
          );
          const users = searchResponse.data.users;
          setSearchResults(users?.length > 0 ? users : null);
          setSearchPerformed(true);
        } catch (err) {
          console.error(err);
          setSearchResults(null);
          setSearchPerformed(true);
        }
      } else {
        setSearchResults(null);
        setSearchPerformed(false);
      }
    };

    searchUsers();
  }, [debouncedSearch]);

  return (
    <>
      <h1>
        {task === "sendmoney"
          ? "Send Money"
          : task === "requestmoney"
          ? "Request Money"
          : "Search Users"}
      </h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, contact or walletKey"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        {searchPerformed && searchResults == null && <p>No users found.</p>}

        {Array.isArray(searchResults) &&
          searchResults.length > 0 &&
          searchResults.map((user) => (
            <div
              key={{ id: user.id }}
              style={{ cursor: "pointer" }}
              onClick={() => sendUserToTransaction(user)}
            >
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <pre>{`${user.contact}     ${user.walletKey}`}</pre>
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchPage;
