import React from "react";
import axios from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const navigate = useNavigate();

  
  return (
    <>
      <button
        onClick={async () => {
          await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/signout`, {
              withCredentials: true, // IMPORTANT to allow cookies
            })
            .then((res) => {
              if (res.data.message === "success") {
                localStorage.removeItem("token");
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
