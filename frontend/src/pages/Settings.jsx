import React from "react";
import api from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();

  
  return (
    <>
      <button
        onClick={async () => {
          await api
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signout`, {
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
