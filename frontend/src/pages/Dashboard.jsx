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

  const renderNavButton = (link, task) => (
    <button>
      <Link
        to={link}
        state={{ task }}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {task}
      </Link>
    </button>
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
    <div style={{ position: "relative" }}>
      <ProfileNameTag />
      <AccountBalance />
      <div style={{ position: "relative" }} ref={dropdownRef}>
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

      <div>
        {renderNavButton("/search", "sendmoney")}
        {renderNavButton("/search", "requestmoney")}
        {renderNavButton("/history", "history")}
        {renderNavButton("/deposit", "deposit")}
        {renderNavButton("/settings", "settings")}
      </div>

      <PaymentRequests />
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
