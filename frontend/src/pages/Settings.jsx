import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();

  
  return (
    <>
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
    </>
  );
};

export default Settings;
