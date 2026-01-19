// pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConfig";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import DesktopSideBar from "../components/DesktopSideBar";

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
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getusers?searchquery=${searchTerm}`,
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
    <div className="lg:flex h-screen">
      <DesktopSideBar />
      <div className="flex-1">
        <div className="relative bg-accent2 text-center p-5 lg:p-7 text-2xl lg:text-3xl font-bold font-[REM]">
          <button className="lg:hidden w-7 h-7 absolute left-5 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
            <img src="../../public/images/arrow-left-solid.svg" alt="Back" className="w-full h-full"  />
          </button>
          <h1>
            {task === "sendmoney"
              ? "Send Money"
              : task === "requestmoney"
              ? "Request Money"
              : "Search Users"}
          </h1>
        </div>

        <div className="p-5 lg:w-200 m-auto ">
          <SearchBar
            onSearch={setSearchTerm}
            delay={300}
            placeholder="Search by name, contact, wallet key"
            inputObjectName="search-input"
          />

          <div style={{ marginTop: "20px" }}>
            {searchPerformed && results.length === 0 && <p className="text-center p-10">No users found.</p>}
            {results.map((user) => (
              <UserCard
                task={task}
                key={user.id}
                user={user}
                onClick={sendUserToTransaction}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
