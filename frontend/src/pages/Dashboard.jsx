import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AccountBalance from "../components/AccountBalance";
import ProfileNameTag from "../components/ProfileNameTag";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is Dashboard</h1>
      <ProfileNameTag />
      <AccountBalance />
      <button
        onClick={async () => {
          await axios
            .get("http://localhost:5000/api/v1/users/signout", {
              withCredentials: true, // IMPORTANT to allow cookies
            })
            .then((res) => {
              if (res.data.message === "success") {
                console.log("Sign out successful");
                navigate("/signin");
              }
            });
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
