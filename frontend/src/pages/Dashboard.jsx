import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AccountBalance from "../components/AccountBalance";
import ProfileNameTag from "../components/ProfileNameTag";
import PaymentRequests from "../components/PaymentRequests";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import axios from "axios";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const renderNavButton = (link, task, svg) => (
   <div className="flex flex-col items-center justify-center gap-1 flex-wrap">
  <Link
    to={link}
    state={{ task }}
    style={{ textDecoration: "none", color: "inherit" }}
    className="flex flex-col items-center gap-1"  // ✅ Added flex column
  >
    <div className="bg-button1 w-20 h-20 rounded-full cursor-pointer relative shadow-lg/10">
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        src={svg}
        alt={task}
      />
    </div>

    <span className="text-md font-[REM]">
      {task === "sendmoney"
        ? "Send"
        : task === "requestmoney"
        ? "Request"
        : task}
    </span>
  </Link>
</div>

  );
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.length > 2) {
        setShowDropdown(true);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/v1/users/getusers?searchquery=${searchTerm}`,
            { withCredentials: true }
          );
          setResults(res.data.users || []);
        } catch (err) {
          console.error("Search error:", err);
          setResults([]);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const handleUserClick = (user) => {
    setShowDropdown(false);
    navigate("/friendprofile", { state: { task: "gotoprofile", user } });
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-accent5 h-screen" style={{ position: "relative" }}>
      <div className="flex items-center justify-between px-5 py-5">
        <ProfileNameTag />
        <a
          href="/settings"
          className="flex items-center justify-center cursor-pointer bg-accent3 rounded-full p-1"
        >
          <img
            src="/images/settings.png"
            className="w-8 h-8 rounded-full"
            alt="settings"
          />
        </a>
      </div>
      <AccountBalance />
      <div
        className="bg-gray-100 mx-5 my-3 rounded-full"
        style={{ position: "relative" }}
        ref={dropdownRef}
      >
        <SearchBar
          onSearch={setSearchTerm}
          delay={300}
          placeholder="Search friends by name, wallet key, etc."
        />
        {showDropdown && (
          <div style={styles.dropdown}>
            {results.length === 0 ? (
              <p style={styles.noResult}>No users found.</p>
            ) : (
              results.map((user) => (
                <UserCard key={user.id} user={user} onClick={handleUserClick} />
              ))
            )}
          </div>
        )}
      </div>

      <div className="flex justify-around items-center m-5">
        {renderNavButton("/search", "sendmoney", "/images/Send.svg")}
        {renderNavButton("/search", "requestmoney", "/images/Request.svg")}
        {renderNavButton("/history", "History", "/images/History.svg")}
        {renderNavButton("/deposit", "Deposit", "/images/Deposit.svg")}
      </div>
      <div className="bg-primary rounded-t-2xl shadow-lg p-5 mt-5">
        <PaymentRequests />
      </div>
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    zIndex: 100,
    maxHeight: "250px",
    overflowY: "auto",
    borderRadius: "4px",
  },
  noResult: {
    padding: "10px",
    color: "#888",
  },
};

export default Dashboard;
