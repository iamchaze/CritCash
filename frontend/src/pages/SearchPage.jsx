import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar"; // Import the new component

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;

  const sendUserToTransaction = (user) => { 
    console.log(user);
    navigate(`/transaction`, { state: { task, user } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length > 2) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/users/getUsers?searchquery=${searchTerm}`,
            { withCredentials: true }
          );
          const users = res.data.users || [];
          setResults(users);
        } catch (err) {
          console.error("Error fetching users:", err);
          setResults([]);
        } finally {
          setSearchPerformed(true);
        }
      } else {
        setResults([]);
        setSearchPerformed(false);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  return (
    <div>
      <h1>
        {task === "sendmoney"
          ? "Send Money"
          : task === "requestmoney"
          ? "Request Money"
          : "Search Users"}
      </h1>

      <SearchBar onSearch={setSearchTerm} delay={300} />

      <div>
        {searchPerformed && results.length === 0 && <p>No users found.</p>}
        {results.map((user) => (
          <div
            key={user.id}
            style={{ cursor: "pointer" }}
            onClick={() => sendUserToTransaction(user)}
          >
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <pre>{`${user.contact}     ${user.walletKey}`}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
