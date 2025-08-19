// pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state?.task;
  const sendUserToTransaction = (user) => {
    navigate("/transaction", { state: { task, user } });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length > 2) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/users/getusers?searchquery=${searchTerm}`,
            { withCredentials: true }
          );
          setResults(res.data.users || []);
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
    <div style={{ padding: "20px" }}>
      <h1>
        {task === "sendmoney"
          ? "Send Money"
          : task === "requestmoney"
          ? "Request Money"
          : "Search Users"}
      </h1>

      <SearchBar
        onSearch={setSearchTerm}
        delay={300}
        placeholder="Search by name, contact, or wallet key"
        inputObjectName="search-input"
      />

      <div style={{ marginTop: "20px" }}>
        {searchPerformed && results.length === 0 && <p>No users found.</p>}
        {results.map((user) => (
          <UserCard task={task} key={user.id} user={user} onClick={sendUserToTransaction} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
