import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AccountBalance from "../components/AccountBalance";
import ProfileNameTag from "../components/ProfileNameTag";
import PaymentRequests from "../components/PaymentRequests";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import DesktopSideBar from "../components/DesktopSideBar";
import axios from "axios";
import MobileNavBar from "../components/MobileNavBar";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const navigate = useNavigate();

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
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target) &&
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-br from-accent1 to-accent2 h-screen lg:flex">
      {/* Sidebar for desktop view*/}
      <DesktopSideBar />
      <div className="flex-1">
        {/* Header for mobile view */}
        <div className="flex items-center justify-between px-5 py-5 lg:hidden">
          <ProfileNameTag />
          <a
            href="/settings"
            className="flex items-center justify-center cursor-pointer bg-accent3 border-1 border-accent4 rounded-full p-1"
          >
            <img
              src="/images/settings.png"
              className="w-8 h-8 rounded-full"
              alt="settings"
            />
          </a>
        </div>
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-6 py-4.5 bg-button1">
          <h1 className="text-2xl font-semibold font-[REM] text-white">Dashboard</h1>
          <div
            className="w-100 lg:w-100 xl:w-150 max-w-150 transition-all duration-300 ease-in-out"
            style={{ position: "relative" }}
            ref={desktopDropdownRef}
          >
            <SearchBar
              onSearch={setSearchTerm}
              delay={300}
              placeholder="Search friends by Name, Wallet Key, Contact"
            />
            {showDropdown && (
              <div style={styles.dropdown}>
                {results.length === 0 ? (
                  <p style={styles.noResult}>No users found.</p>
                ) : (
                  results.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onClick={handleUserClick}
                    />
                  ))
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-amber-50">
              <img
                src="/images/lightmode.svg"
                className="w-6 h-6"
                alt="dark mode"
              />
            </button>
           
          </div>
        </div>
        {/* Mobile size */}
        <div className="lg:grid md:grid-cols-2 lg:items-center lg:grid-cols-3 lg:gap-6 lg:px-6 lg:py-4">
          <div className="">
            <AccountBalance />
          </div>
          <div
            className="mx-5 my-3 lg:hidden"
            style={{ position: "relative" }}
            ref={mobileDropdownRef}
          >
            <SearchBar
              onSearch={setSearchTerm}
              delay={300}
              placeholder="Search friends by Name, Wallet Key, Contact"
            />
            {showDropdown && (
              <div style={styles.dropdown}>
                {results.length === 0 ? (
                  <p style={styles.noResult}>No users found.</p>
                ) : (
                  results.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                      onClick={handleUserClick}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex justify-around items-center mx-5 lg:hidden">
            <MobileNavBar />
          </div>

          <div className="w-auto hidden lg:col-span-2 lg:flex lg:flex-col lg:space-y-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className=" text-lg font-semibold mb-4">Active Autopays</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <PaymentRequests />
            </div>
          </div>

          {/* Mobile Payment Requests */}
          <div className="bg-primary rounded-t-2xl shadow-lg p-5 mt-5 lg:hidden">
            <PaymentRequests />
          </div>
        </div>
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
